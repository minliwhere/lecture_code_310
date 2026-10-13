# 05b Lecture Activities

## Exploring Org Chart

Run yarn start in 05a-patterns-i/org-chart/before.

1. Analyze: Read Manager.ts and trace how cto.getHeadcount() reaches Bob. Resolve the two TODOs so the CTO's org totals are right. Suppose you add a DataScientist role. What would you have to change, and what could go wrong?
2. Design: What does Manager ask every employee, whatever their role? How could Manager ask without knowing whether an employee is one person or a whole team?
3. Implement:  Refactor Manager so it only depends on Employee. Add DataScientist. Which files did you change?

## Exploring Coffee Cart

Run yarn start in 05b-patterns-ii/coffee-cart/before.

1. Analyze
  - Resolve the two TODOs so large drinks are priced and described correctly.
  - Suppose we add a mocha add-on. What would you have to change, and what could go wrong?
2. Design
  - Why not one subclass per combination (LatteWithWhip, LargeLatteWithWhip, …)? How many classes would 4 drinks and 3 add-ons need?
  - In Composite, a Manager answered by asking its reports. What if an add-on answered by asking the one drink it wraps?
3. Implement
  - Refactor CoffeeCart so it only depends on Drink.
  - Add mocha. Which files did you change?
