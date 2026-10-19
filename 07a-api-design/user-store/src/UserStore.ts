export interface User {
	readonly id: string;
	readonly name: string;
	readonly email: string;
}

export interface UserStore {
	users: Map<string, User>;
	lastOperationSucceeded: boolean;

	/**
	 * Adds a user to the store.
	 * If a user with the same id already exists, the store is unchanged.
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
