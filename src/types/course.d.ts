import { Types } from "mongoose";
import { StringLang, StringLangs, SimpleCourse } from "./common";

export interface CourseType extends SimpleCourse {
  _id: string;
  who_is_this_course_for?: StringLangs;
  is_dependent: boolean;
  have_target: boolean;
  related_courses?: Types.ObjectId[];
  icon: string;
  duration: number;
  lectures: number;
  workshops: number;
  real_projects: number;
  have_objectives: boolean;
  objectives?: {
    name: {
      EN: string;
      AR: string;
    };
    description: {
      EN: string;
      AR: string;
    };
    icon: string;
  }[];
}
export interface RelatedCoursesType {
  _id: string;
  name: StringLang;
  main_img: string;
}
