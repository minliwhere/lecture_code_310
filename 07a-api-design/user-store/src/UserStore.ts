export interface User {
	id: string;
	name: string;
	email: string;
}

export interface UserStore {
	/* list of users, sorted by email */
	users: User[];
	/* a boolean indicating if the last mutable operation succeeded */
	lastOperationSucceeded: boolean;

	/**
	 * Adds a user to the store.
	 * Assigns a random id to the user if successfully created, overriding the provided one.
	 */
	add(u: User): void;

	/**
	 * Returns the user with the given id, or null if not found.
	 */
	find(id: string): User | null;

	/**
	 * Deletes the user with the given id.
	 * If no such user exists, the store is unchanged.
	 */
	delete(id: string): void;
}
