// ADAPTER — wraps StripeClient (Adaptee) to satisfy PaymentAdapter (Target).
// Translation required:
//   • cents  → dollars  (÷ 100)
//   • boolean → PaymentResult  (unpack status + chargeId)
//   • currency code + description must be supplied

import { StripeClient }              from "../stripe";
import { PaymentAdapter, PaymentResult } from "./PaymentAdapter";

export class StripeAdapter implements PaymentAdapter {
  readonly providerName = "Stripe";
  private client: StripeClient;

  constructor(client: StripeClient) {
    this.client = client;
  }

  charge(amountCents: number, description: string): PaymentResult {
    // StripeClient speaks dollars — adapt: divide by 100, add currency + description.
    const amountDollars = amountCents / 100;
    const result = this.client.createCharge(amountDollars, "CAD", description);

    if (result.status === "succeeded") {
      return { success: true, transactionId: result.chargeId };
    }
    return { success: false, errorMessage: `Stripe declined (network code: ${result.networkCode})` };
  }
}
