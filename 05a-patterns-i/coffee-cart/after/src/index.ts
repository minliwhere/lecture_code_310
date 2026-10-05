// CLIENT — only imports the interface and the adapters; never touches
// BankCardReader or StripeClient directly.
import { PaymentAdapter } from "./payments/PaymentAdapter";
import { BankCardReaderAdapter } from "./payments/BankCardReaderAdapter";
import { StripeAdapter } from "./payments/StripeAdapter";
import { BankCardReader } from "./bank";
import { StripeClient } from "./stripe";
import { CoffeeCart } from "./cart";

// ─── Register payment providers ───────────────────────────────────────────────
// Adding a third provider = one new Adapter class + ONE new line here.
// e.g.  new PayPalAdapter(new PayPalClient())
const adapters: PaymentAdapter[] = [
	new BankCardReaderAdapter(new BankCardReader()),
	new StripeAdapter(new StripeClient()),
];

// ─── Run an order through every registered provider ───────────────────────────
for (const adapter of adapters) {
	runOrder(adapter);
}

function runOrder(payment: PaymentAdapter): void {
	console.log(`\n═══════════ ORDER (${payment.providerName.toUpperCase()}) ═══════════`);

	// CoffeeCart only knows about PaymentAdapter — never about providers
	const cart = new CoffeeCart(payment);
	cart.addItem("Latte", 2, ["oat milk"]);
	cart.addItem("Espresso", 1);
	cart.addItem("Croissant", 2);
	cart.addItem("Cold Brew", 1);
	cart.addItem("Avocado Toast", 1);

	cart.printReceipt();

	const result = cart.checkout();
	if (result.success) {
		console.log(`\nPayment: ✓ Approved`);
		console.log(`TX ID:   ${result.transactionId}`);
	} else {
		console.log(`\nPayment: ✗ ${result.errorMessage}`);
	}
}
