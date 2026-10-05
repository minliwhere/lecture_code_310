/**
 * COMPONENT INTERFACE (Composite pattern)
 *
 * Both leaf nodes (Engineer, Designer, …) and composite nodes (Manager)
 * implement this interface. The client never needs to distinguish between them.
 */
export interface Employee {
  name: string;
  traverse(depth: number): void;
  getSalary(): number;
  getHeadcount(): number;
}
