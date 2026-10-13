export class Phone {
	private state: "off" | "locked" | "ready" = "off";

	constructor(private fingerprint: string) {}

	pressPower(): void {
		switch (this.state) {
			case "off":
				console.log("  Powering on.");
				this.state = "locked";
				break;
			case "locked":
				// TODO: A locked phone powers off when Power is pressed.
				break;
			case "ready":
				console.log("  Powering off.");
				this.state = "off";
				break;
		}
	}

	pressHome(finger: string): void {
		switch (this.state) {
			case "off":
				console.log("  Powering on.");
				this.state = "locked";
				break;
			case "locked":
				// TODO: A locked phone unlocks if the finger matches its fingerprint,
				// and says "Fingerprint not recognized." if it doesn't.
				break;
			case "ready":
				console.log("  Going to the home screen.");
				break;
		}
	}

	receiveNotification(app: string, text: string): void {
		switch (this.state) {
			case "off":
				console.log(`  Missed a notification from ${app}: the phone is off.`);
				break;
			case "locked":
				// TODO: A locked phone shows which app sent a notification, but not its text.
				break;
			case "ready":
				console.log(`  🔔 ${app}: ${text}`);
				break;
		}
	}
}
