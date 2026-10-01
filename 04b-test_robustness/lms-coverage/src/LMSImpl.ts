import { Assessment, CourseCompletion, LMS } from "./LMS";

export class LMSImpl implements LMS {
	getLetterGrade(grade: number): string {
		if (grade < 0 || grade > 100) {
			throw new RangeError(`Grade must be from 0 to 100, not ${grade}.`);
		}
		if (grade >= 80) return "A";
		if (grade >= 68) return "B";
		if (grade >= 55) return "C";
		if (grade >= 50) return "D";
		return "F";
	}

	computeGPA(completedCourses: CourseCompletion[]): number {
		// a later attempt at a course replaces the earlier one
		const latestAttempts = new Map<string, CourseCompletion>();
		for (const completion of completedCourses) {
			latestAttempts.set(completion.course, completion);
		}

		let totalPoints = 0;
		let totalCredits = 0;
		for (const { grade, credits } of latestAttempts.values()) {
			totalPoints += this.gradePoints(this.getLetterGrade(grade)) * credits;
			totalCredits += credits;
		}
		return totalCredits === 0 ? 0 : totalPoints / totalCredits;
	}

	computeGrade(assessments: Assessment[]): number {
		let total = 0;
		for (const { id, weight, points, maxPoints } of assessments) {
			if (points > maxPoints) {
				throw new Error(`${id} has ${points} points, but is out of ${maxPoints}.`);
			}
			total += (points / maxPoints) * weight;
		}
		return total * 100;
	}

	private gradePoints(letter: string): number {
		switch (letter) {
			case "A":
				return 4;
			case "B":
				return 3;
			case "C":
				return 2;
			case "D":
				return 1;
			case "F":
				return 0;
			default:
				throw new Error(`No grade points for letter grade ${letter}.`);
		}
	}
}
