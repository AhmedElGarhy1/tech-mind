import { StringLang, StringLangs } from "../types/common";
import { CourseType } from "../types/course";
import { AdminDiplomaType } from "../types/deploma";

interface FQAType {
  q: StringLang;
  a: StringLangs;
}

interface ObjectivesType {
  name: {
    EN: string;
    AR: string;
  };
  description: {
    EN: string;
    AR: string;
  };
  icon: string;
}

const checkTextArEn = (name: StringLang, message: string) => {
  if (!name || !name.AR || !name.EN) throw Error(message);
};
const checkArrayArEn = (stringArr: StringLangs, message: string) => {
  if (
    !stringArr ||
    !stringArr.AR ||
    !stringArr.EN ||
    stringArr.AR.length < 1 ||
    stringArr.EN.length < 1
  )
    throw Error(message);

  const maxArrayLength = [
    ...Array(Math.max(stringArr.AR.length, stringArr.EN.length)),
  ];

  maxArrayLength.forEach((_, i) => {
    if (!stringArr.AR[i] || !stringArr.EN[i]) throw Error(message);
  });
};

const checkFQA = (fqaObj: FQAType[], message: string) => {
  if (!fqaObj || fqaObj.length < 1) throw Error(message);

  fqaObj.forEach((fqa) => {
    if (
      !fqa.q ||
      !fqa.a ||
      !fqa.q.AR ||
      !fqa.q.EN ||
      !fqa.a.AR ||
      !fqa.a.EN ||
      typeof fqa.a.AR !== "object" ||
      typeof fqa.a.EN !== "object" ||
      fqa.a.AR.length < 1 ||
      fqa.a.EN.length < 1
    ) {
      throw Error(message);
    }

    const maxArrayLength = [
      ...Array(Math.max(fqa.a.AR.length, fqa.a.EN.length)),
    ];

    maxArrayLength.forEach((_, i) => {
      if (!fqa.a.AR[i] || !fqa.a.EN[i]) throw Error(message);
    });
  });
};

const checkNumber = (num: string | number, message: string) => {
  if (typeof num !== "number" || num <= 0) throw Error(message);
};

const checkIfCourseHaveObjectives = (
  objectives: ObjectivesType[],
  message: string
) => {
  console.log(objectives);
  if (!objectives || objectives.length < 1) throw Error(message);
  objectives.forEach((objective) => {
    if (
      !objective.name ||
      !objective.name.EN ||
      !objective.name.AR ||
      !objective.description.EN ||
      !objective.description.AR
    ) {
      throw Error(message);
    }
  });
};

export const validateCourse = (course: CourseType) => {
  let msg = "Invalid ";

  if (!course) throw Error("Please Provide all Info to create the course");

  checkTextArEn(course.name, msg + "Name");
  checkTextArEn(course.description, msg + "Description");
  checkArrayArEn(course.overview, msg + "Overview");
  checkArrayArEn(course.what_you_will_learn, msg + "What you will learn text");
  checkFQA(course.fqa, "FQA");
  checkNumber(course.duration, msg + "Duration");
  checkNumber(course.lectures, msg + "Lectures");
  checkNumber(course.workshops, msg + "Workshops");
  checkNumber(course.real_projects, msg + "Real Projects");

  if (course.have_target) {
    const whoIsThisCourseFor = course.who_is_this_course_for as StringLangs;
    checkArrayArEn(
      whoIsThisCourseFor,
      "the course have target put 'who is this course made for' text"
    );
  }

  if (course.have_objectives) {
    const objective = course.objectives as ObjectivesType[];
    checkIfCourseHaveObjectives(
      objective,
      "Course Objectives is missing and the course have objectives"
    );
  }
};

export const validateDiploma = (diploma: AdminDiplomaType) => {
  let msg = "Invalid ";

  if (!diploma) throw Error("Please Provide all Info to create the diploma");

  checkTextArEn(diploma.name, msg + "Name");
  checkTextArEn(diploma.description, msg + "Description");
  checkArrayArEn(diploma.overview, msg + "Overview");
  checkArrayArEn(diploma.what_you_will_learn, msg + "What you will learn text");
  checkFQA(diploma.fqa, msg + "FQA");
};
