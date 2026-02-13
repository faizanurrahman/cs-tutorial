import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, throwError, timeout } from 'rxjs';
import { RateLimiterService } from './rate-limiter.service';

export interface ExecutionRequest {
  language: string;
  version: string;
  files: Array<{
    name?: string;
    content: string;
  }>;
  stdin?: string;
  args?: string[];
  compile_timeout?: number;
  run_timeout?: number;
  compile_memory_limit?: number;
  run_memory_limit?: number;
}

export interface ExecutionResponse {
  language: string;
  version: string;
  run: {
    stdout: string;
    stderr: string;
    code: number;
    signal: string | null;
    output: string;
  };
  compile?: {
    stdout: string;
    stderr: string;
    code: number;
    signal: string | null;
    output: string;
  };
}

export interface LanguageRuntime {
  language: string;
  version: string;
  aliases: string[];
}

@Injectable({
  providedIn: 'root',
})
export class CodeExecutionService {
  private readonly http = inject(HttpClient);
  private readonly rateLimiter = inject(RateLimiterService);

  private readonly PISTON_API_URL = 'https://emkc.org/api/v2/piston';
  private readonly RATE_LIMIT_KEY = 'code_execution';
  private readonly RATE_LIMIT_CONFIG = {
    maxRequests: 5,
    windowMs: 60000, // 1 minute
  };

  /**
   * Execute code using Piston API
   */
  executeCode(request: ExecutionRequest): Observable<ExecutionResponse> {
    // Check rate limit
    if (
      !this.rateLimiter.isAllowed(this.RATE_LIMIT_KEY, this.RATE_LIMIT_CONFIG)
    ) {
      const resetTime = this.rateLimiter.getTimeUntilReset(this.RATE_LIMIT_KEY);
      return throwError(
        () =>
          new Error(
            `Rate limit exceeded. Please wait ${resetTime} seconds before trying again.`,
          ),
      );
    }

    // Execute with timeout
    return this.http
      .post<ExecutionResponse>(`${this.PISTON_API_URL}/execute`, request)
      .pipe(
        timeout(10000), // 10 second timeout
        catchError(this.handleError),
      );
  }

  /**
   * Get available language runtimes
   */
  getRuntimes(): Observable<LanguageRuntime[]> {
    return this.http
      .get<LanguageRuntime[]>(`${this.PISTON_API_URL}/runtimes`)
      .pipe(catchError(this.handleError));
  }

  /**
   * Get remaining execution attempts
   */
  getRemainingAttempts(): number {
    return this.rateLimiter.getRemainingRequests(
      this.RATE_LIMIT_KEY,
      this.RATE_LIMIT_CONFIG,
    );
  }

  /**
   * Get time until rate limit resets
   */
  getResetTime(): number {
    return this.rateLimiter.getTimeUntilReset(this.RATE_LIMIT_KEY);
  }

  /**
   * Get language configuration for Piston
   */
  getLanguageConfig(language: string): { language: string; version: string } {
    const configs: Record<string, { language: string; version: string }> = {
      javascript: { language: 'javascript', version: '18.15.0' },
      python: { language: 'python', version: '3.10.0' },
      java: { language: 'java', version: '15.0.2' },
      cpp: { language: 'c++', version: '10.2.0' },
      c: { language: 'c', version: '10.2.0' },
      typescript: { language: 'typescript', version: '5.0.3' },
      rust: { language: 'rust', version: '1.68.2' },
      go: { language: 'go', version: '1.16.2' },
      ruby: { language: 'ruby', version: '3.0.1' },
      php: { language: 'php', version: '8.2.3' },
    };

    return (
      configs[language.toLowerCase()] || {
        language: 'python',
        version: '3.10.0',
      }
    );
  }

  /**
   * Get file extension for language
   */
  getFileExtension(language: string): string {
    const extensions: Record<string, string> = {
      javascript: 'js',
      python: 'py',
      java: 'java',
      cpp: 'cpp',
      c: 'c',
      typescript: 'ts',
      rust: 'rs',
      go: 'go',
      ruby: 'rb',
      php: 'php',
    };

    return extensions[language.toLowerCase()] || 'txt';
  }

  /**
   * Error handler
   */
  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An error occurred during code execution';

    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else if (error.status === 0) {
      // Network error
      errorMessage = 'Network error. Please check your connection.';
    } else if (error.status === 429) {
      // Rate limit
      errorMessage = 'Too many requests. Please try again later.';
    } else if (error.status >= 500) {
      // Server error
      errorMessage =
        'Server error. The code execution service is temporarily unavailable.';
    } else {
      // Other HTTP error
      errorMessage = `Error: ${error.message}`;
    }

    return throwError(() => new Error(errorMessage));
  }
}
