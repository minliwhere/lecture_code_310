# 04a Lecture Activities

## buyCoffee: Can we just pass in the answer?

Sometimes the code we want to test doesn't just need a value: it needs to call something.

1. Analyze: Run the tests a few times. Do they pass every time? Why not? Would a real bank fix that?
2. Design: How could a test choose what the bank says? Try the previous fix. What goes wrong?
3. Implement:
    - Declare an interface for what buyCoffee needs from a card reader.
    - Pass a card reader into buyCoffee instead of creating one inside it.
    - In the tests, pass a test double that implements the interface.

## buyCoffee: Did we charge the right amount?

Our doubles let a test choose what the bank says, but not see what buyCoffee asked it to charge.

1. Analyze: Change buyCoffee to charge 45 cents. Run the tests. Do any of them fail? Why not?
2. Design: One way to make output observable is by returning it. Would returning the amount from buyCoffee work here?
3. Implement:
    - Write a double that remembers every amount it's asked to charge, and approves.
    - Pass it to buyCoffee, then check what it remembered.
