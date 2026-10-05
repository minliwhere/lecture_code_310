# Coffee Cart — Adapter Pattern Activity

## Scenario

You inherited the Coffee Cart codebase just as the business signed a deal with **Stripe**
as a second payment provider. The existing code hard-wires `BankCardReader` into the cart,
and someone bolted on Stripe support by copy-pasting a new `else if` branch into `checkout()`.
The cart now carries optional fields for every provider, branches on a provider-type string
in three places, and hand-rolls a cents→dollars conversion inline.

Your job: refactor `before/` using the **Adapter pattern** so that adding a future provider
(PayPal, Square, …) requires writing exactly one new file and adding one line to `index.ts`.

---

## The smell in `before/`

| Problem | Where |
|---|---|
| Provider type leaks into cart constructor, three optional fields, three `if/else` branches | `cart.ts` |
| Unit conversion (cents → dollars) buried inside business logic | `cart.ts` · `checkout()` |
| Every new provider requires editing `CoffeeCart` in at least 4 places | `cart.ts` |
| Client (`index.ts`) must know which string literal picks each provider | `index.ts` |

---

## Comparison: cost of adding a third provider

| | `before/` | `after/` |
|---|---|---|
| Files to create | 0 | 1 (new Adapter class) |
| Files to edit | 1 (`cart.ts`) | 1 (`index.ts`) — one new line |
| Edit locations inside `cart.ts` | 4 (union type, field, constructor branch, checkout branch) | 0 |
| Unit/format conversion site | inline in `checkout()` | inside the new Adapter |

---

## File trees

```
before/
└── src/
    ├── index.ts        entry point — instantiates cart with a provider string
    ├── cart.ts         CoffeeCart — carries all provider logic (THE SMELL)
    ├── bank.ts         BankCardReader — original card reader (unchanged adaptee)
    ├── stripe.ts       StripeClient   — second provider   (unchanged adaptee)
    └── menu.ts         menu items and types

after/
└── src/
    ├── index.ts                    CLIENT — only touches PaymentAdapter
    ├── cart.ts                     CONTEXT — no provider fields, no branches
    ├── bank.ts                     ADAPTEE — unchanged
    ├── stripe.ts                   ADAPTEE — unchanged
    ├── menu.ts                     shared menu — unchanged
    └── payments/
        ├── PaymentAdapter.ts       TARGET INTERFACE — PaymentAdapter + PaymentResult
        ├── BankCardReaderAdapter.ts  ADAPTER — wraps BankCardReader
        └── StripeAdapter.ts          ADAPTER — wraps StripeClient (converts cents→dollars)
```

---

## Running the code

```bash
# Before (smelly version)
cd before && npm install && npm start

# After (Adapter pattern)
cd after && npm install && npm start
```

Both versions produce **identical numeric output** (subtotals, tax, totals, payment outcomes)
because they share the same seeded RNG (`seed = 42`) and call it in the same order.

---

## Notable output differences

- **Provider label on the receipt** — `before/` prints the raw string `"bank"` / `"stripe"`;
  `after/` prints `payment.providerName` (e.g. `"Bank"` / `"Stripe"`). This is a design
  improvement, not a behavioural change, and is a useful discussion point.
- **Bank transaction IDs** — both use an incrementing counter (`bank-tx-1`, `bank-tx-2`).
  Stripe `chargeId` values are generated from the same seeded RNG, so they match exactly.

---

## Discussion questions

1. **Count the edit sites.** Open `before/src/cart.ts` and find every line you would need to
   touch to add a PayPal provider. Now open `after/src/index.ts` and count the same. What does
   that difference tell you about which codebase is cheaper to maintain?

2. **Locate the unit conversion.** In `before/`, where does the cents→dollars conversion live?
   Who is responsible for knowing that Stripe speaks dollars? In `after/`, where does that
   knowledge live, and why is that a better home for it?

3. **The `StripeAdapter.charge()` signature accepts `amountCents` even though `StripeClient`
   never sees cents.** Why is the adapter's *public* interface expressed in cents rather than
   dollars, even though it converts internally?

4. **Dependency direction.** Draw the import arrows for `before/cart.ts` and for `after/cart.ts`.
   Which concrete classes does each depend on? What happens to the `CoffeeCart` class in `after/`
   if you swap out the payment provider — do you need to recompile or change `cart.ts`?

5. **Stub-ability.** The activity title is "test doubles". How would you write a unit test for
   `CoffeeCart.checkout()` in `before/` without hitting a real payment network? How does the
   `PaymentAdapter` interface in `after/` make that easier? What kind of test double would you
   reach for, and where would you inject it?
