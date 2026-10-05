import { Employee } from "./Employee";

/**
 * COMPOSITE NODE
 *
 * Manager holds a single list of Employee — it doesn't care whether a report
 * is an Engineer, a Designer, another Manager, or any future role.
 * Every operation loops over that one list exactly once.
 */
export class Manager implements Employee {
  private reports: Employee[] = [];

  constructor(public name: string, private salary: number) {}

  add(report: Employee): void {
    this.reports.push(report);
  }

  traverse(depth: number = 0): void {
    console.log("  ".repeat(depth) + `[Manager] ${this.name}`);
    for (const report of this.reports) {
      report.traverse(depth + 1);
    }
  }

  getSalary(): number {
    return this.salary + this.reports.reduce((sum, r) => sum + r.getSalary(), 0);
  }

  getHeadcount(): number {
    return 1 + this.reports.reduce((sum, r) => sum + r.getHeadcount(), 0);
  }

  // Adding a new operation (e.g. getAverageTenure()) means adding it here
  // and to the Employee interface — Manager's loop never changes shape.
}
