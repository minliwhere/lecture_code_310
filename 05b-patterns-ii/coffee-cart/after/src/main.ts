import { CoffeeCart } from "./cart";
import { MenuDrink } from "./menu";
import { ExtraShot, Large, Whip } from "./addOns";

const cart = new CoffeeCart();
cart.addDrink(new MenuDrink("Espresso"));
cart.addDrink(new ExtraShot(new MenuDrink("Latte")));
cart.addDrink(new Whip(new Large(new MenuDrink("Cold Brew"))));
cart.addDrink(new Whip(new Whip(new MenuDrink("Matcha Latte"))));
cart.printReceipt();
