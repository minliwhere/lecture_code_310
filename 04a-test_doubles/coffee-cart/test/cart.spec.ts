import { expect } from "chai";
import { buyCoffee } from "../src/cart";

describe("buyCoffee", () => {
	it("serves coffee when the card is charged", () => {
		expect(buyCoffee("iced")).to.equal("enjoy your coffee");
	});

	it("refuses when the card is declined", () => {
		expect(buyCoffee("decaf")).to.equal("card declined");
	});
});
