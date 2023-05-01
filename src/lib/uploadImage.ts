import {
  getDownloadURL,
  ref,
  uploadBytesResumable,
  deleteObject,
} from "firebase/storage";
import storage from "../config/firebaseConfig";
import { GlobalImagesFilesType } from "../pages/Admin/Courses/AddCourse";
import { GlobalImagesStringType } from "../components/Admin/Helper/ButtonAddRecord";

export const uploadFile = async (
  file: File,
  path: "Course" | "Diploma"
): Promise<{ name: string; value: string } | string | null> => {
  try {
    if (!file) return null;

    const storageRef = ref(
      storage,
      `${path.toLocaleLowerCase()}s/${file.name + "-" + Date.now()}`
    );
    await uploadBytesResumable(storageRef, file);
    const downloadURL = await getDownloadURL(storageRef);
    return downloadURL;
  } catch (err) {
    console.log(err);
    return null;
  }
};
export const deleteImage = async (
  fileName: string,
  path: "Course" | "Diploma"
): Promise<{ name: string; value: string } | string | null> => {
  try {
    if (!fileName) return null;

    const storageRef = ref(storage, `${path.toLocaleLowerCase()}s/${fileName}`);
    await deleteObject(storageRef);
  } catch (err) {
    console.log(err);
  }
};

export const sendCourseImagesToFirebase = async (
  images: GlobalImagesFilesType,
  stateImages: GlobalImagesStringType
) => {
  if (!images.main_img && !stateImages.main_img) {
    throw Error("Please Provide Main Image");
  }
  if (!images.other_src && !stateImages.other_src) {
    throw Error(
      "Please Provide The other Sourse course = JIF, diploma = video"
    );
  }

  const icon_promise = uploadFile(images.icon, "Course");
  const main_img_promise = uploadFile(images.main_img, "Course");
  const other_src_promise = uploadFile(images.other_src, "Course");
  const objectives_promise = Promise.all(
    images.objectives.map(async (obj) => await uploadFile(obj, "Course"))
  );
  const [icon, main_img, other_src, objectives] = await Promise.all([
    icon_promise,
    main_img_promise,
    other_src_promise,
    objectives_promise,
  ]);
  return { icon, main_img, objectives, other_src };
};
