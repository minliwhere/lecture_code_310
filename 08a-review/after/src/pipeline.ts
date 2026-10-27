export interface Tester {
	execute(): Promise<boolean>;
}

/** @returns true if and only if running the command passed successfully */
async function runOnCommandLine(odds: number, arg0: string): Promise<boolean> {
	// this is a dangerous function!!!
	// pretend this does what we want it to do, with a small chance of random failure.
	return Promise.resolve(Math.random() < odds);
}

export class UnitTester implements Tester {
	execute() {
		return runOnCommandLine(0.95, 'yarn mocha "test/unit/**/*.ts"');
	}
}

export class IntegrationTester implements Tester {
	execute() {
		return runOnCommandLine(0.8, 'yarn mocha "test/integration/**/*.ts"');
	}
}

// pipelines
export interface Pipeline {
	name(): string;
	run(): Promise<boolean>;
}

export class DefaultPipeline implements Pipeline {
	name() {
		return "Suite";
	}
	async run() {
		return Promise.resolve(true);
	}
}

export class GenericPipeline implements Pipeline {
	constructor(
		private myName: string,
		private t: Tester,
		private p: Pipeline,
	) {}

	name(): string {
		return (
			this.myName + (this.p.name() === "Suite" ? "" : " and ") + this.p.name()
		);
	}

	async run() {
		// TODO: Implement! run() should execute all prior pipelines and then execute t's.
		// return a Promise<boolean> representing whether all tests passed.
	}
}

export class UnitTestPipeline extends GenericPipeline {
	// TODO: implement
}

export class IntegrationTestPipeline extends GenericPipeline {
	// TODO: implement
}

// TODO: implement E2ETestPipeline
