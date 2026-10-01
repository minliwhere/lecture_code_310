/** A graded piece of work in a course, such as a quiz, assignment, or exam. */
export interface Assessment {
	/** Unique identifier, e.g. `"Quiz_1"`. */
	id: string;
	/** Fraction of the course grade this assessment is worth, from 0 to 1. */
	weight: number;
	/** Points the student earned. */
	points: number;
	/** Points available. */
	maxPoints: number;
}

/** A course a student has finished. */
export interface CourseCompletion {
	/** Course code, e.g. `"CPSC 310"`. */
	course: string;
	/** Final percentage grade, a whole number from 0 to 100. */
	grade: number;
	/** Credit value of the course, a whole number from 1 to 4. */
	credits: number;
}

/** The core grading operations of a basic learning management system (LMS). */
export interface LMS {
	/**
	 * Converts a percentage grade to a letter grade.
	 *
	 * | Letter | Percentage |
	 * | ------ | ---------- |
	 * | A      | 80–100     |
	 * | B      | 68–79      |
	 * | C      | 55–67      |
	 * | D      | 50–54      |
	 * | F      | 0–49       |
	 *
	 * @param grade - The grade to convert, in percent. Valid grades are 0 to 100.
	 * @returns The letter grade: `"A"`, `"B"`, `"C"`, `"D"`, or `"F"`.
	 * @throws RangeError if grade is below 0 or above 100.
	 */
	getLetterGrade(grade: number): string;

	/**
	 * Computes a student's GPA, weighting each course by its credits.
	 *
	 * Each course's grade is converted to grade points (A = 4, B = 3, C = 2, D = 1, F = 0).
	 * The GPA is the sum of grade points × credits, divided by the total credits.
	 * If a student took a course more than once, only the latest attempt counts.
	 *
	 * @example
	 * // (4 × 3 + 2 × 1) / (3 + 1) = 3.5
	 * lms.computeGPA([
	 *   { course: "CPSC 310", grade: 85, credits: 3 },
	 *   { course: "MATH 200", grade: 60, credits: 1 },
	 * ]);
	 *
	 * @param completedCourses - The student's completed courses, in the order they were taken.
	 * @returns The GPA, from 0.0 to 4.0, or 0.0 if there are no courses.
	 */
	computeGPA(completedCourses: CourseCompletion[]): number;

	/**
	 * Computes a student's overall percentage grade in a course.
	 *
	 * Each assessment contributes its score (points / maxPoints) scaled by its weight.
	 *
	 * @param assessments - The course's assessments. Weights must be non-negative and sum to 1.
	 * @returns The overall grade, from 0 to 100.
	 * @throws Error if any assessment has more points than maxPoints.
	 */
	computeGrade(assessments: Assessment[]): number;
}
