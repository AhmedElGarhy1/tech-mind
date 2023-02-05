import { Types } from "mongoose";
import { StringLang, StringLangs, SimpleCourse } from "./common";

export interface DeplomaType extends SimpleCourse {
  _id: string;
  who_is_this_course_for: StringLangs;
  courses: Types.ObjectId[];
  duration: number;
  workshops: number;
  lectures: number;
  real_projects: number;
}
export interface DeplomaCourse {
  _id: Types.ObjectId;
  duration: number;
  workshops: number;
  lectures: number;
  real_projects: number;
  name: StringLang;
  description: StringLang;
  icon: string;
}
