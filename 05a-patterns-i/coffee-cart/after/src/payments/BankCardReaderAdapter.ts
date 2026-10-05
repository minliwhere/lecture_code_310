import { BankCardReader } from "../bank";
import { PaymentAdapter, PaymentResult } from "./PaymentAdapter";

export class BankCardReaderAdapter implements PaymentAdapter {
	readonly providerName = "Bank";
	private reader: BankCardReader;
	private static txCounter = 1;

	constructor(reader: BankCardReader) {
		this.reader = reader;
	}

	charge(amountCents: number, _description: string): PaymentResult {
		// BankCardReader.charge() already speaks cents — pass through directly.
		const approved = this.reader.charge(amountCents);
		if (approved) {
			return { success: true, transactionId: `bank-tx-${BankCardReaderAdapter.txCounter++}` };
		}
		return { success: false, errorMessage: "Declined by bank" };
	}
}
