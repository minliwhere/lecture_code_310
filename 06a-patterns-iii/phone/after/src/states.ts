import { Phone } from "./Phone";
import { PhoneState } from "./PhoneState";

export class OffState implements PhoneState {
	constructor(private phone: Phone) {}

	pressPower(): void {
		console.log("  Powering on.");
		this.phone.setState(new LockedState(this.phone));
	}

	pressHome(finger: string): void {
		console.log("  Powering on.");
		this.phone.setState(new LockedState(this.phone));
	}

	receiveNotification(app: string, text: string): void {
		console.log(`  Missed a notification from ${app}: the phone is off.`);
	}
}

export class LockedState implements PhoneState {
	constructor(private phone: Phone) {}

	pressPower(): void {
		console.log("  Powering off.");
		this.phone.setState(new OffState(this.phone));
	}

	pressHome(finger: string): void {
		if (this.phone.recognizes(finger)) {
			console.log("  Unlocked.");
			this.phone.setState(new ReadyState(this.phone));
		} else {
			console.log("  Fingerprint not recognized.");
		}
	}

	receiveNotification(app: string, text: string): void {
		console.log(`  🔒 New notification from ${app}`);
	}
}

export class ReadyState implements PhoneState {
	constructor(private phone: Phone) {}

	pressPower(): void {
		console.log("  Powering off.");
		this.phone.setState(new OffState(this.phone));
	}

	pressHome(finger: string): void {
		console.log("  Going to the home screen.");
	}

	receiveNotification(app: string, text: string): void {
		console.log(`  🔔 ${app}: ${text}`);
	}
}
