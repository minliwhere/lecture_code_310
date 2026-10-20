import { User, UserStore } from "./UserStore";

/** only calls add() if the user has a unique email in the system.
 * return true/false based on if the user was successfully added
 */
function addIfAbsent(store: UserStore, user: User): boolean {
	// TODO: implement
}

/** updates the user with `id` to have the `newEmail`. */
function updateEmail(store: UserStore, id: string, newEmail: string) {
	// TODO: implement
}
