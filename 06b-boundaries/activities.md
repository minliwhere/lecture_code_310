# 06b Lecture Activities

## Draw the boundary

Run yarn start book IKB-261 <you> 2026-11-03 12:00 13:00 then open data/bookings.json.

1. Analyze (01-booking)
    - An external tool needs startTime and endTime. Update bookings.json to use those names.
    - What did you have to change in the code? Why is it a problem?
2. Design (01-booking)
    - What interface would you rather book() depend on? Write its signature.
    - Who should declare it, and what implements it?
3. Implement (in 02-booking)
    - Move the booking rules into the core so test/core/rooms.spec.ts passes.
    - Fill in JsonBookingStore, and make run() book through the core. Which files know the field names now?

## Test each side

Run yarn test, then

1. Analyze (03-booking)
    - Refer to the responsibilities table. For each job outside the core, what could go wrong without the core's tests noticing?
2. Design (03-booking)
    - For each item on your list, write a pending it() at the narrowest level that can catch it: e2e in test/e2e.spec.ts and integration in test/adapters/JsonBookingStore.spec.ts
3. Implement (03-booking)
    - Fill in your tests. What did they find?
    - The external tool renames startTime to start_time. Predict which files and tests will change, then make the change
