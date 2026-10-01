export class CoastPayTerminal {
	/** Returns true if the card was charged, false if it was declined. Throws an error if the network request failed. */
	public async charge(cents: number): Promise<boolean> {
		try {
			const response = await fetch("api.verysecurepayments.com/pay");
			return Promise.resolve(response.ok);
		} catch {
			throw new Error("Network request failed!");
		}
	}
}
