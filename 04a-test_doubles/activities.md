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

## Activity: Parkboard’s checkout

checkout() in src/payment.ts has the same problem as buyCoffee.

1. Analyze: Run yarn start pay FT-110-B c11 a few times. What stops you from testing checkout()?
2. Implement: Make checkout() depend on an interface instead of creating a CoastPayTerminal. The pay command in main.ts should still use the real one.
3. Test: Write tests for an approved card and a declined card, plus one that checks checkout() charged the right amount.

Hint: customers c11, c12,and c13 aren’t registered in FT-110-B. Use the real priceFor to work out the expected amount.
