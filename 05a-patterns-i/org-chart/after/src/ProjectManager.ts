import { Employee } from "./Employee";

/** LEAF NODE */
export class ProjectManager implements Employee {
  constructor(public name: string, private salary: number) {}

  traverse(depth: number = 0): void {
    console.log("  ".repeat(depth) + `[ProjectManager] ${this.name}`);
  }

  getSalary(): number { return this.salary; }
  getHeadcount(): number { return 1; }
}
