import { Assessment, CourseCompletion, LMS } from "./LMS";

export class LMSImpl implements LMS {
	getLetterGrade(grade: number): string {
		throw new Error("Method not implemented.");
	}

	computeGPA(completedCourses: CourseCompletion[]): number {
		throw new Error("Method not implemented.");
	}

	computeGrade(assessments: Assessment[]): number {
		throw new Error("Method not implemented.");
	}
}
