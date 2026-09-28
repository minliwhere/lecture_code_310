import { expect } from "chai";
import { buyCoffee } from "../src/cart";

describe("buyCoffee", () => {
	it("serves coffee when the card is charged", () => {
		expect(buyCoffee()).to.equal("enjoy your coffee");
	});

	it("refuses when the card is declined", () => {
		expect(buyCoffee()).to.equal("card declined");
	});
});
