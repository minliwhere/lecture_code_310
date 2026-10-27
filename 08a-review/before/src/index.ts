import {
	UnitTestAndIntegrationTestPipeline,
	UnitTestOnlyPipeline,
} from "./pipeline";

class Runner {
	runPipeline(ty: "unit" | "unitIntegration") {
		if (ty === "unit") {
			console.log(`Running Unit Tests`);
			const unit = new UnitTestOnlyPipeline();
			unit.run();
		} else if (ty === "unitIntegration") {
			console.log(`Running Unit Tests and Integration Tests`);
			const unitIntegration = new UnitTestAndIntegrationTestPipeline();
			unitIntegration.run();
		}
	}
}

// sample usage
new Runner().runPipeline("unit");
