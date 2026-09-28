import { Offering } from "./Offering";
import { Customer } from "./Customer";
import { priceFor } from "./invoice";
import { CoastPayTerminal } from "./coastpay";

/**
 * Taking payment at the front desk. A customer is registered only once their card has been charged.
 */

const CENTS_PER_DOLLAR = 100;

export function checkout(offering: Offering, customer: Customer): string {
	const amount = priceFor(offering, customer);
	const terminal = new CoastPayTerminal();
	if (!terminal.charge(Math.round(amount * CENTS_PER_DOLLAR))) {
		return `card declined — ${customer.name} is not registered`;
	}

	offering.register(customer);
	return `${customer.name} is registered in ${offering.id} — charged $${amount.toFixed(2)}`;
}
