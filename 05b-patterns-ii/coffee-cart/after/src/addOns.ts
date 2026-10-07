import { Drink } from "./Drink";

/** Wraps a drink, and answers by changing the wrapped drink's answer. */
export abstract class AddOn implements Drink {
	constructor(protected drink: Drink) {}

	abstract getDescription(): string;
	abstract getPriceCents(): number;
}

export class ExtraShot extends AddOn {
	getDescription(): string {
		return this.drink.getDescription() + " + extra shot";
	}

	getPriceCents(): number {
		return this.drink.getPriceCents() + 100;
	}
}

export class Whip extends AddOn {
	getDescription(): string {
		return this.drink.getDescription() + " + whip";
	}

	getPriceCents(): number {
		return this.drink.getPriceCents() + 50;
	}
}

export class Large extends AddOn {
	getDescription(): string {
		return "Large " + this.drink.getDescription();
	}

	getPriceCents(): number {
		return Math.round(this.drink.getPriceCents() * 1.5);
	}
}
