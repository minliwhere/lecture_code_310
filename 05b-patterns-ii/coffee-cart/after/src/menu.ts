import { Drink } from "./Drink";

export type MenuItem = {
	name: string;
	priceCents: number;
};

export const MENU: MenuItem[] = [
	{ name: "Espresso", priceCents: 350 },
	{ name: "Latte", priceCents: 500 },
	{ name: "Cold Brew", priceCents: 550 },
	{ name: "Matcha Latte", priceCents: 600 },
];

export class MenuDrink implements Drink {
	private item: MenuItem;

	constructor(name: string) {
		const item = MENU.find((m) => m.name === name);
		if (!item) throw new Error(`"${name}" is not on the menu`);
		this.item = item;
	}

	getDescription(): string {
		return this.item.name;
	}

	getPriceCents(): number {
		return this.item.priceCents;
	}
}
