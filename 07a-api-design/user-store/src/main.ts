import { User, UserStore } from "./UserStore";

/** only calls add() if the user has a unique email in the system.
 * return true/false based on if the user was successfully added
 */
function addIfAbsent(store: UserStore, user: User): boolean {
	for (const otherUser of store.users) {
		if (otherUser.email === user.email) return false;
	}
	store.add(user);
	return store.lastOperationSucceeded;
}

/** updates the user with `id` to have the `newEmail`. */
function updateEmail(store: UserStore, id: string, newEmail: string) {
	const user = store.find(id);
	if (!user) {
		store.lastOperationSucceeded = false;
		return;
	}
	// user exists
	const updatedUser = store.users.find((other: User) => other.id == id);
	updatedUser.email = newEmail;
	// store.users[0].email = newEmail;

	// B
	updatedUser = user;
	updatedUser.email = newEmail
	store.update(updatedUser);
	// user.email = newEmail;
	// store.users.sort((a: User, b: User) => {
	// 	return a.email < b.email ? -1 : 1;
	// });
	// store.lastOperationSucceeded = true;
}
