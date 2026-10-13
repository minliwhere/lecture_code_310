/** What the phone does when a button is pressed or a notification arrives, in one state. */
export interface PhoneState {
	pressPower(): void;
	pressHome(finger: string): void;
	receiveNotification(app: string, text: string): void;
}
