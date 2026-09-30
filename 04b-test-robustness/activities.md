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
