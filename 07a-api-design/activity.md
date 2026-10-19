Task1: Write a function addIfAbsent() that:
1. Adds a user to the store only if no user with the same id already exists.
2. Returns true if the user was added successfully, false otherwise

Task 2: Write a function updateEmail that:
1. Takes a user id and an email
2. Updates the user to use that email

Then, Discuss:

1. Did your neighbour do it the same way? Was there another way to do it?
2. Was this API easy or hard to use? Why?

Redesign UserStore so that:
1. Information hiding is preserved
2. There is one way to do “add/delete if present”
3. add() and delete() communicate their outcomes directly in return type/signature

We want to do our API design upgrades for add() and delete(), but without breaking clients. What are some ways we can do this? 
