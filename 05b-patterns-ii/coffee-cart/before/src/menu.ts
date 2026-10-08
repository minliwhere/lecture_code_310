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
