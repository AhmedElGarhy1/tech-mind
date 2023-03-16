export const currentLanguage = (isEnglish: boolean): "EN" | "AR" =>
  isEnglish ? "EN" : "AR";

export const validateEmail = (email: string): string => {
  const filter =
    /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

  if (!filter.test(email)) {
    return "Please Provide a Valid Email Address";
  }
  return "";
};
