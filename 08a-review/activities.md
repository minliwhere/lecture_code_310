1. Starter task: fill in the TODOS in `/before` (both the `/src` and `/test` directories!)
2. Pre-Analysis:
    1. What testability attributes are making it difficult for you from testing the other two TODOs?
    2. We want to add the ability to run end-to-end (E2E) tests, which can be run in any combination with Unit and Integration tests. Describe the code changes this would require. Why is this a problem in our current implementation? Use terms like tangling, scattering, coupling, cohesion, and/or testability.
3. Design:
    1. What responsibilities should we delegate out of `Runner`?
    2. What responsibilities do each pipeline share?
    3. Should we use our abstraction compose, or transform?
4. Implement:
    1. Define the `Pipeline` interface
    2. Define the `GenericPipeline` which implements `Pipeline`
    3. Define the `UnitTestPipeline`, `IntegrationTestPipeline`, and `E2ETestPipeline` pipeline
5. Test: fill in missing tests in the `/after` directory
