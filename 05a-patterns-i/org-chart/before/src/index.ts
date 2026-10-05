// ─── LEAF TYPES ────────────────────────────────────────────────────────────────
// Each role is its own separate class with no shared interface.

class Engineer {
	constructor(
		public name: string,
		public salary: number,
	) {}

	traverse(depth: number = 0) {
		console.log("  ".repeat(depth) + `[Engineer] ${this.name}`);
	}
}

class Designer {
	constructor(
		public name: string,
		public salary: number,
	) {}

	traverse(depth: number = 0) {
		console.log("  ".repeat(depth) + `[Designer] ${this.name}`);
	}
}

class ProjectManager {
	constructor(
		public name: string,
		public salary: number,
	) {}

	traverse(depth: number = 0) {
		console.log("  ".repeat(depth) + `[ProjectManager] ${this.name}`);
	}
}

class TechLead {
	constructor(
		public name: string,
		public salary: number,
	) {}

	traverse(depth: number = 0) {
		console.log("  ".repeat(depth) + `[TechLead] ${this.name}`);
	}
}

class Manager {
	managers: Array<Manager> = [];
	engineers: Array<Engineer> = [];
	designers: Array<Designer> = [];
	projectManagers: Array<ProjectManager> = [];
	techLeads: Array<TechLead> = [];

	constructor(
		public name: string,
		public salary: number,
	) {}

	traverse(depth: number = 0) {
		console.log("  ".repeat(depth) + `[Manager] ${this.name}`);
		for (const m of this.managers) m.traverse(depth + 1);
		for (const e of this.engineers) e.traverse(depth + 1);
		for (const d of this.designers) d.traverse(depth + 1);
		for (const pm of this.projectManagers) pm.traverse(depth + 1);
		for (const tl of this.techLeads) tl.traverse(depth + 1);
	}

	getSalary(): number {
		let total = this.salary;
		for (const m of this.managers) total += 12345; // TODO: Replace this placeholder. A manager's reported salary is their own salary plus that of everyone who reports to them.
		for (const e of this.engineers) total += e.salary;
		for (const d of this.designers) total += d.salary;
		for (const pm of this.projectManagers) total += pm.salary;
		for (const tl of this.techLeads) total += tl.salary;
		return total;
	}

	getHeadcount(): number {
		let count = 1;
		for (const m of this.managers) count += 12345; // TODO: Replace this placeholder. A manager's headcount is themself plus the headcount of everyone who reports to them.
		for (const e of this.engineers) count += 1;
		for (const d of this.designers) count += 1;
		for (const pm of this.projectManagers) count += 1;
		for (const tl of this.techLeads) count += 1;
		return count;
	}
}

// TODO:  add a DataScientist role! we would need to:

// ─── BUILD ORG CHART ───────────────────────────────────────────────────────────

const cto = new Manager("CTO", 200);

const alice = new Manager("Alice", 180);
alice.engineers.push(new Engineer("Bob", 120));
alice.engineers.push(new Engineer("Carol", 110));
alice.techLeads.push(new TechLead("Deborah", 140));
alice.designers.push(new Designer("Ethan", 130));

const grace = new Manager("Grace", 140);
grace.designers.push(new Designer("Henry", 105));
grace.designers.push(new Designer("Isabel", 130));

cto.managers.push(alice);
cto.projectManagers.push(new ProjectManager("Frank", 130));
cto.managers.push(grace);

// ─── REPORTS ───────────────────────────────────────────────────────────────────

const fmt = (n: number) => `$${n.toLocaleString()}`;

console.log("=== Org Chart ===");
cto.traverse();

console.log("\n=== Reports ===");
console.log(
	`Alice's team:  ${alice.getHeadcount()} people, ${fmt(alice.getSalary())} total salary`,
);
console.log(
	`Grace's team:  ${grace.getHeadcount()} people, ${fmt(grace.getSalary())} total salary`,
);
console.log(
	`CTO's org:     ${cto.getHeadcount()} people, ${fmt(cto.getSalary())} total salary`,
);
