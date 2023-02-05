export interface StringLang {
  EN: string;
  AR: string;
}
export interface StringLangs {
  EN: string[];
  AR: string[];
}

export interface SimpleCourse {
  name: StringLang;
  description: StringLang;
  overview: StringLangs;
  main_img: string;
  other_src: string;
  what_you_will_learn: StringLangs;
  fqa: {
    q: StringLang;
    a: StringLangs;
  }[];
}
