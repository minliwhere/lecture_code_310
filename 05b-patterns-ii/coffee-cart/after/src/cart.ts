import { Drink } from "./Drink";

const dollars = (cents: number) => `$${(cents / 100).toFixed(2)}`;

export class CoffeeCart {
	private drinks: Drink[] = [];

	addDrink(drink: Drink): void {
		this.drinks.push(drink);
	}

	getTotal(): number {
		return this.drinks.reduce((sum, drink) => sum + drink.getPriceCents(), 0);
	}

	printReceipt(): void {
		console.log("┌─── RECEIPT ─────────────────────────────────┐");
		for (const drink of this.drinks) {
			console.log(`│  ${drink.getDescription().padEnd(34)} ${dollars(drink.getPriceCents()).padStart(6)}  │`);
		}
		console.log("├─────────────────────────────────────────────┤");
		console.log(`│  ${"TOTAL".padEnd(34)} ${dollars(this.getTotal()).padStart(6)}  │`);
		console.log("└─────────────────────────────────────────────┘");
	}
}
