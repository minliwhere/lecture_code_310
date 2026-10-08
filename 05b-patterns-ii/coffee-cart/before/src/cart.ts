import { MENU } from "./menu";

type OrderItem = { name: string; priceCents: number; addOns: string[] };

const dollars = (cents: number) => `$${(cents / 100).toFixed(2)}`;

export class CoffeeCart {
	private items: OrderItem[] = [];

	addDrink(name: string, addOns: string[] = []): void {
		const item = MENU.find((m) => m.name === name);
		if (!item) throw new Error(`"${name}" is not on the menu`);
		this.items.push({ name: item.name, priceCents: item.priceCents, addOns });
	}

	getTotal(): number {
		return this.items.reduce((sum, item) => sum + this.priceOf(item), 0);
	}

	printReceipt(): void {
		console.log("┌─── RECEIPT ─────────────────────────────────┐");
		for (const item of this.items) {
			console.log(`│  ${this.describe(item).padEnd(34)} ${dollars(this.priceOf(item)).padStart(6)}  │`);
		}
		console.log("├─────────────────────────────────────────────┤");
		console.log(`│  ${"TOTAL".padEnd(34)} ${dollars(this.getTotal()).padStart(6)}  │`);
		console.log("└─────────────────────────────────────────────┘");
	}

	private priceOf(item: OrderItem): number {
		let price = item.priceCents;
		for (const addOn of item.addOns) {
			switch (addOn) {
				case "extra shot":
					price += 100;
					break;
				case "whip":
					price += 50;
					break;
				case "large":
					// TODO: A large drink costs 1.5 times as much, rounded to the nearest cent.
					break;
				default:
					throw new Error(`"${addOn}" is not an add-on`);
			}
		}
		return price;
	}

	private describe(item: OrderItem): string {
		let description = item.name;
		for (const addOn of item.addOns) {
			switch (addOn) {
				case "extra shot":
					description += " + extra shot";
					break;
				case "whip":
					description += " + whip";
					break;
				case "large":
					// TODO: A large drink's description starts with "Large", e.g. "Large Latte".
					break;
				default:
					throw new Error(`"${addOn}" is not an add-on`);
			}
		}
		return description;
	}
}
