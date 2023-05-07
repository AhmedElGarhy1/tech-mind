import { StringLang } from "./common";

interface techInfo {
  main_img: string;
  name: StringLang;
  _id: string;
}

export interface ReservationType {
  createdAt: string;
  email: string;
  fromCourse: techInfo | null;
  fromDiploma: techInfo | null;
  name: string;
  phone: string;
  tech_id: string;
  _id: string;
}
