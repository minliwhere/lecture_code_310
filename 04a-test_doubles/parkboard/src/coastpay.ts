/**
 * The CoastPay card terminal on every front desk counter. The customer taps or inserts their card, and
 * the terminal reads it.
 *
 * CoastPay is the payment processor the city signed with. Every charge goes over the network to
 * CoastPay's servers, and an approved charge is real money leaving a real customer's account.
 */
export class CoastPayTerminal {
	/** Returns true if the card was charged, false if it was declined. Never throws. */
	public charge(cents: number): boolean {
		// There is no CoastPay account behind this code, so this stands in for CoastPay's answer.
		// Like the real thing, the caller doesn't get to pick which answer comes back.
		return Math.random() < 0.7;
	}
}
