# 04b Lecture Activities

## getLetterGrade: How many tests is enough?

Read getLetterGrade() in lms-ecp/src/LMS.ts. It isn't implemented yet, so you can't run anything.

Write down the inputs you would test it with, and what each one should return. Stop when you're confident that passing them all means it works.

## Activity: Partitioning the LMS

computeGPA() in lms-ecp/src/LMS.ts isn't implemented either. Test it from the specs.

1. Analyze: For computeGPA, what does the spec say about each field of a course? About the list of courses? What range of outputs can it produce?
2. Design: Pick a representative for each class, plus the values at each boundary. Work out the GPA each one should return.
3. Implement: In test/LMS.spec.ts, write one pending test per case: an it() with a title and no function. Put the input and the expected output in the title. Run yarn test.
4. Reflect: Which cases couldn't you give an expected output for? Is that a gap in your cases, or in the spec? Compare with your getLetterGrade tests from the start of class. Which classes did you miss?

Do the same for computeGrade. Watch for fields that constrain each other.

## Coverage: Is 100% worth it?

lms-coverage has an implementation of the LMS, and a test for every partition from the last activity.

1. Analyze: Run yarn cover. Which line do the tests never run? What input would reach it?
2. Design: No valid input reaches it. How could a test reach it anyway? Think back to last lecture.
3. Implement: Make the line reachable, and write a test that runs it.
4. Reflect: What did 100% cost? Does the new test check anything the spec promises? Could you get rid of the line instead of testing it?
