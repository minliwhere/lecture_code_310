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

1. **Analyze:** Run `yarn start pay FT-110-B c11`. 
    1. What do we want to test in `checkout()`?
    2. What testability concerns prevent you from testing them?
2. **Implement:** Use DIP to make `checkout()` depend on an abstract interface called `IPaymentProcessor` (instead of creating a concrete `CoastPayTerminal` instance).
    1. What contract (behaviour, pre/post conditions) does `IPaymentProcessor` need to hold?
    2. Make `CoastPayTerminal` implement `IPaymentProcessor`
    2. Update `checkout()`’s caller to provide an instance of `CoastPayTerminal`
3. **Test:** Now that we have DIP, we can test what we want. Define one or more `FakeTerminal`s that implement `IPaymentProcessor`. Ensure that LSP contracts are upheld! Then write tests for:
    1. an approved card returns the correct string
    2. a declined card returns the correct string
    3. `checkout()` charges the correct amount

Hint: customers c11, c12,and c13 aren’t registered in FT-110-B. Use the real priceFor to work out the expected amount.
