import { BankCardReader } from "./bank";

export function buyCoffee(): string {
	const reader = new BankCardReader();
	return reader.charge(450) ? "enjoy your coffee" : "card declined";
}
