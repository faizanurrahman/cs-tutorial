/**
 * Memory cell for array visualization
 */
export interface MemoryCell {
  value: any;
  index: number;
  highlighted?: boolean;
  color?: string;
  label?: string;
}

/**
 * Linked List Node
 */
export interface LinkedListNode {
  value: any;
  next?: LinkedListNode;
  highlighted?: boolean;
  color?: string;
}

/**
 * Tree Node (Binary Tree)
 */
export interface TreeNode {
  value: any;
  left?: TreeNode;
  right?: TreeNode;
  highlighted?: boolean;
  color?: string;
  x?: number; // Position for rendering
  y?: number;
}

/**
 * Graph Node
 */
export interface GraphNode {
  id: string;
  label: string;
  x?: number;
  y?: number;
  color?: string;
}

/**
 * Graph Edge
 */
export interface GraphEdge {
  from: string;
  to: string;
  weight?: number;
  directed?: boolean;
  highlighted?: boolean;
}

/**
 * Pointer for visualization
 */
export interface Pointer {
  name: string;
  index: number;
  color?: string;
}

/**
 * Animation step for visualizers
 */
export interface AnimationStep {
  description: string;
  highlightIndices?: number[];
  pointers?: Pointer[];
  data?: any[];
}
