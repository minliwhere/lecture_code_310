import { DefaultPipeline, GenericPipeline, Tester } from "../src/pipeline";

class FakeTester implements Tester {
	calls: number = 0;
	constructor(private res: boolean) {}
	execute(): Promise<boolean> {
		this.calls += 1;
		return Promise.resolve(true);
	}
}

describe("GenericPipeline", () => {
	it("is named properly", () => {
		const unitAndIntegration = new GenericPipeline(
			"Generic",
			new FakeTester(true),
			new DefaultPipeline(),
		);
		expect(unitAndIntegration.name).to.equal("Generic Suite");
	});

	it("terminates early if first testing pipeline fails", () => {
		// TODO: write this test now!
	});

	it("returns true if all pipelines pass", () => {
		// TODO: write this test now!
	});
});
