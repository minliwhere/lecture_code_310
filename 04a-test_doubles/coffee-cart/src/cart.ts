import { BankCardReader } from "./bank";

// prices are in cents
export function buyCoffee(modification?: string): string {
	const reader = new BankCardReader();
	let price = 450;
	if (modification === "decaf") price += 100;
	else if (modification === "iced") price += 50;
	return reader.charge(price) ? "enjoy your coffee" : "card declined";
}
