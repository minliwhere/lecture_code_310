import { CoffeeCart } from "./cart";

const cart = new CoffeeCart();
cart.addDrink("Espresso");
cart.addDrink("Latte", ["extra shot"]);
cart.addDrink("Cold Brew", ["large", "whip"]);
cart.addDrink("Matcha Latte", ["whip", "whip"]);
cart.printReceipt();
