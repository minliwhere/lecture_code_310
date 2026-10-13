interface State {
	pressPower(): State;
	pressHome(finger: string, expectedFingerprint: string): State;
	receiveNotification(app: string, text: string): State;
}

class OffState implements State {
	private fingerprint: string;
	constructor(fingerprint: string) {
		this.fingerprint = fingerprint;
	}
	pressPower(): State {
		console.log("  Powering on.");
		return new LockedState(this.fingerprint);
	}
	pressHome(finger: string, expectedFingerprint: string): State {
		console.log("  Powering on.");
		return new LockedState(this.fingerprint);
	}
	receiveNotification(app: string, text: string): State {
		console.log(`  Missed a notification from ${app}: the phone is off.`);
		return this;
	}
}

class LockedState implements State {
	private fingerprint: string;
	constructor(fingerprint: string) {
		this.fingerprint = fingerprint;
	}
	pressPower(): State {
		console.log("  Powering off.");
		return new OffState(this.fingerprint);
	}
	pressHome(finger: string, expectedFingerprint: string): State {
		if (finger === this.fingerprint) {
			console.log("  Unlocking!.");
			return new ReadyState();
		} else {
			console.log("Fingerprint not recognized.");
			if (failed 3 times)
				return new SuperLocked()
			return this;
		}
	}
	receiveNotification(app: string, text: string): State {
		throw new Error("Method not implemented.");
	}
}

class SuperLocked ...  {

}

class ReadyState implements State {
	pressPower(): State {
		throw new Error("Method not implemented.");
	}
	pressHome(finger: string): State {
		throw new Error("Method not implemented.");
	}
	receiveNotification(app: string, text: string): State {
		throw new Error("Method not implemented.");
	}
}
/**
 * 1. Implement each state as a class implementing State
 * 2. (if time) integrate these classes into Phone
 */

export class Phone {
	// private state: "off" | "locked" | "ready" = "off";
	private state: State;

	constructor(private fingerprint: string) {
		this.state = new OffState(fingerprint);
	}

	pressPower(): void {
		this.state = this.state.pressPower();
	}

	pressHome(finger: string): void {
		this.state = this.state.pressHome(finger);
	}

	receiveNotification(app: string, text: string): void {
		this.state.receiveNotification(app, text);
	}
}
