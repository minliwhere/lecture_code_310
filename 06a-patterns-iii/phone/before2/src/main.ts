import { Phone } from "./Phone";

const phone = new Phone("Alex");

function step(label: string, event: () => void): void {
	console.log(`> ${label}`);
	event();
}

step("Messages: Lunch at 12?", () => phone.receiveNotification("Messages", "Lunch at 12?"));
step("press home with Alex's finger", () => phone.pressHome("Alex"));
step("Messages: Lunch at 12?", () => phone.receiveNotification("Messages", "Lunch at 12?"));
step("press home with Sam's finger", () => phone.pressHome("Sam"));
step("press home with Alex's finger", () => phone.pressHome("Alex"));
step("Calendar: CPSC 310 starts in 10 minutes", () =>
	phone.receiveNotification("Calendar", "CPSC 310 starts in 10 minutes")
);
step("press home with Alex's finger", () => phone.pressHome("Alex"));
step("press power", () => phone.pressPower());
step("press power", () => phone.pressPower());
step("press power", () => phone.pressPower());
