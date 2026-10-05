import { Manager } from "./Manager";
import { Engineer } from "./Engineer";
import { Designer } from "./Designer";
import { ProjectManager } from "./ProjectManager";
import { TechLead } from "./TechLead";

// ─── BUILD ORG CHART ───────────────────────────────────────────────────────────
// Manager.add() accepts any Employee — leaf or composite.
// No type-specific arrays, type-checking, or separate code paths.

const cto = new Manager("CTO", 200_000);

const alice = new Manager("Alice", 180_000);
alice.add(new Engineer("Bob", 120_000));
alice.add(new Engineer("Carol", 115_000));
alice.add(new TechLead("Dave", 140_000));
alice.add(new Designer("Eve", 110_000));

const grace = new Manager("Grace", 170_000);
grace.add(new Designer("Henry", 105_000));
grace.add(new Designer("Isabel", 108_000));

cto.add(alice);
cto.add(new ProjectManager("Frank", 130_000));
cto.add(grace);

// Adding a DataScientist role requires zero changes here or in Manager —
// just: class DataScientist implements Employee { ... }

// ─── REPORTS ───────────────────────────────────────────────────────────────────
// The client works entirely through the Employee interface.
// It doesn't know or care what types are in the tree.

const fmt = (n: number) => `$${n.toLocaleString()}`;

console.log("=== Org Chart ===");
cto.traverse();

console.log("\n=== Reports ===");
console.log(`Alice's team:  ${alice.getHeadcount()} people, ${fmt(alice.getSalary())} total salary`);
console.log(`Grace's team:  ${grace.getHeadcount()} people, ${fmt(grace.getSalary())} total salary`);
console.log(`CTO's org:     ${cto.getHeadcount()} people, ${fmt(cto.getSalary())} total salary`);
