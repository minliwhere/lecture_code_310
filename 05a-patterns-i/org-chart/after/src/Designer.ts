import { Employee } from "./Employee";

/** LEAF NODE */
export class Designer implements Employee {
  constructor(public name: string, private salary: number) {}

  traverse(depth: number = 0): void {
    console.log("  ".repeat(depth) + `[Designer] ${this.name}`);
  }

  getSalary(): number { return this.salary; }
  getHeadcount(): number { return 1; }
}
