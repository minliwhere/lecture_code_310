// TARGET INTERFACE — the only payment contract the rest of the app ever touches.
// Every payment provider must be wrapped in a class that implements this.

export interface PaymentResult {
  success: boolean;
  transactionId?: string;   // present on success
  errorMessage?:  string;   // present on failure
}

export interface PaymentAdapter {
  /** Human-readable name shown on receipts and logs. */
  readonly providerName: string;

  /**
   * Charge the given amount (in cents, CAD).
   * @param amountCents - smallest currency unit; adapters convert as needed
   * @param description - line-item summary for the payment portal
   */
  charge(amountCents: number, description: string): PaymentResult;
}
