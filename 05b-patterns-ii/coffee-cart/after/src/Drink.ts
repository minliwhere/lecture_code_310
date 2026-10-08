/** Anything the cart can sell: a drink from the menu, or one with add-ons. */
export interface Drink {
	getDescription(): string;
	getPriceCents(): number;
}
