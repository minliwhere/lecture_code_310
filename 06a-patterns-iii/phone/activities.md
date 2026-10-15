# 06a Lecture Activities

## Exploring Phone States

Run yarn start in 06a-patterns-iii/phone/before.

1. Analyze
    - Resolve the three TODOs so a locked phone works.
    - Suppose the phone should lock out after reading three unrecognized fingerprints. What would you have to change, and what could go wrong?
2. Design
    - Where should everything a locked phone does live?
    - How does a state tell Phone which state comes next?
3. Implement
    - Refactor Phone so it only depends on PhoneState.
    - Add the lockout. Which files did you change?


## Axis of Change: a new Phone Button

The phone needs two new buttons: volume up and volume down.

1. Implement the buttons in before2/ (switch version)
2. Implement the buttons in after/ (State version)

How many files and methods had to change under each of the two designs?
