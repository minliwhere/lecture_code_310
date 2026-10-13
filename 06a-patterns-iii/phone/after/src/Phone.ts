import { PhoneState } from "./PhoneState";
import { OffState } from "./states";

export class Phone {
	private state: PhoneState = new OffState(this);

	constructor(private fingerprint: string) {}

	setState(state: PhoneState): void {
		this.state = state;
	}

	recognizes(finger: string): boolean {
		return finger === this.fingerprint;
	}

	pressPower(): void {
		this.state.pressPower();
	}

	pressHome(finger: string): void {
		this.state.pressHome(finger);
	}

	receiveNotification(app: string, text: string): void {
		this.state.receiveNotification(app, text);
	}
}
