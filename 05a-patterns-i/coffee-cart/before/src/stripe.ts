/**
 * Client for the Stripe payment API (second provider).
 */
export interface StripeChargeResult {
	status: "succeeded" | "failed";
	chargeId: string;
	networkCode: string;
}

export class StripeClient {
	public createCharge(amountDollars: number, currency: string, description: string): StripeChargeResult {
		const succeeded = Math.random() < 0.85;
		const chargeId = `ch_${Math.random().toString(36).slice(2, 11)}`;
		return {
			status: succeeded ? "succeeded" : "failed",
			chargeId,
			networkCode: succeeded ? "00" : "51",
		};
	}
}
