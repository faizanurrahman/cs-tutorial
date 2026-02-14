public class Car {
  // Fields (attributes)
  private String brand;
  private int speed;

  // Constructor
  public Car(String brand) {
    this.brand = brand;
    this.speed = 0;
  }

  // Methods (behavior)
  public void accelerate() {
    speed += 10;
  }

  public void brake() {
    speed = Math.max(0, speed - 10);
  }
}
