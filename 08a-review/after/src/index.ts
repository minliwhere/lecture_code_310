import {
	DefaultPipeline,
	IntegrationTestPipeline,
	UnitTestPipeline,
	Pipeline,
} from "./pipeline";

class Runner {
	runPipeline(p: Pipeline) {
		console.log(`Running ${p.name()}`);
		p.run();
	}
}

// Sample usage
const pipeline = new IntegrationTestPipeline(
	new UnitTestPipeline(new DefaultPipeline()),
);
pipeline.run();
