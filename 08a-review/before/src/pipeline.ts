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

export class UnitTestOnlyPipeline {
	private unitTester = new UnitTester();
	name(): string {
		return "Unit Tests";
	}

	run() {
		return this.unitTester.execute();
	}
}

export class UnitTestAndIntegrationTestPipeline {
	private unitTester = new UnitTester();
	private integrationTester = new IntegrationTester();

	name(): string {
		return "Unit Tests and Integration Tests";
	}

	async run() {
		// TODO: Implement! run() should execute unit testing, and if that succeeds, run integration testing.
		// return a Promise<boolean> representing whether all tests passed.
	}
}
