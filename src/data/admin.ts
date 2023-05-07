import type { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import {
  faBook,
  faMessage,
  faPeopleRobbery,
  faSheetPlastic,
} from "@fortawesome/free-solid-svg-icons";

export interface AdminLinkType {
  id: number;
  name: string;
  pathname: string;
  icon: IconDefinition;
}

export const adminLinks: AdminLinkType[] = [
  {
    id: 1,
    name: "Diplomas",
    pathname: "/admin/diplomas",
    icon: faBook,
  },
  {
    id: 2,
    name: "Courses",
    pathname: "/admin/courses",
    icon: faSheetPlastic,
  },
  {
    id: 3,
    name: "Messages",
    pathname: "/admin/messages",
    icon: faMessage,
  },
  {
    id: 4,
    name: "Registrations",
    pathname: "/admin/registrations",
    icon: faPeopleRobbery,
  },
];
