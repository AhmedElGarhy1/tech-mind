import { Types } from "mongoose";
import { StringLang, StringLangs, SimpleCourse } from "./common";
import { CourseObjectivesType } from "../store/slices/Admin/CourseSlice";

export interface DeplomaType extends SimpleCourse {
  _id: string;
  who_is_this_course_for: StringLangs;
  courses: CourseObjectivesType[];
  duration: number;
  workshops: number;
  lectures: number;
  real_projects: number;
  have_video: boolean;
}

export interface AdminDiplomaType extends SimpleCourse {
  who_is_this_course_for: StringLangs;
  _id?: string;
  have_video: boolean;
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
export interface GlobalDiplomaImagesStringType {
  main_img: string;
  other_src: string;
}
