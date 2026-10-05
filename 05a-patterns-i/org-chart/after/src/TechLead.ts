import { Employee } from "./Employee";

/** LEAF NODE */
export class TechLead implements Employee {
  constructor(public name: string, private salary: number) {}

  traverse(depth: number = 0): void {
    console.log("  ".repeat(depth) + `[TechLead] ${this.name}`);
  }

  getSalary(): number { return this.salary; }
  getHeadcount(): number { return 1; }
}
