import React, { FC, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import {
  selectCourseFull,
  selectCourseImages,
  selectCourseIsSent,
  updateCourseImages,
  updateIsSent,
} from "../../../store/slices/Admin/CourseSlice";
import { addCourse, updateCourse } from "../../../api/get-api";
import Swal from "sweetalert2";
import { GlobalImagesFilesType } from "../../../pages/Admin/Courses/AddCourse";
import { sendCourseImagesToFirebase } from "../../../lib/uploadImage";
import { validateCourse } from "../../../lib/validation";

interface Params {
  type: "Course" | "Diploma";
  images: GlobalImagesFilesType;
  actionType: "update" | "add";
  resetImages: () => void;
}

export interface GlobalImagesStringType {
  icon: string;
  main_img: string;
  other_src: string;
  objectives: string[];
}

const ButtonAddRecord: FC<Params> = ({
  type,
  images,
  actionType,
  resetImages,
}) => {
  const course = useAppSelector(selectCourseFull);
  const stateImages = useAppSelector(selectCourseImages);
  const isSent = useAppSelector(selectCourseIsSent);
  const dispatch = useAppDispatch();

  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [canWeSend, setCanWeSend] = useState<boolean>(false);

  useEffect(() => {
    const sendCourse = async () => {
      try {
        if (isSent) return;
        if (!sent) {
          setSent(true);
          return;
        }
        validateCourse(course);
        await sendImages();
        setCanWeSend(true);
      } catch (err) {
        if (err instanceof Error) {
          Swal.fire(err.message, "need some modifications", "error");
        }
        setLoading(false);
      } finally {
        dispatch(updateIsSent(false));
      }
    };
    sendCourse();
  }, [isSent]);

  useEffect(() => {
    if (!canWeSend) return;
    const fun = async () => {
      try {
        let res;
        if (type === "Course") {
          if (actionType === "add") {
            res = await addCourse(course);
          } else {
            res = await updateCourse(course._id, course);
          }
        } else {
          // if (actionType === "add") {
          //   res = await addCourse(course);
          // } else {
          //   res = await updateCourse(course._id, course);
          // }
        }
        // reset the images to prevent send them again
        resetImages();
        if (res.ok)
          Swal.fire("The Course is Saved Successfully", "Done!", "success");
        else {
          let msg = res.msg;
          if (msg.includes("duplicate key")) msg = "Course Name is Duplicated";
          Swal.fire(msg, "need some modifications", "error");
        }
      } catch (err) {
      } finally {
        setCanWeSend(false);
        setLoading(false);
      }
    };
    fun();
  }, [canWeSend]);

  const sendImages = async () => {
    const finalImagesStrings = (await sendCourseImagesToFirebase(
      images,
      stateImages
    )) as GlobalImagesStringType;
    console.log(finalImagesStrings);
    dispatch(updateCourseImages(finalImagesStrings));
  };

  const handleClick = async () => {
    Swal.fire("Uploading", `<p> Upload images + upload data </p>`, "question");
    dispatch(updateIsSent(true));
    setLoading(true);
  };

  return (
    <div className="pb-4 pt-2 mx-auto">
      <Button
        style={{
          width: "fit-content",
        }}
        className="mx-auto fw-bold fs-5 px-3 py-2"
        disabled={loading}
        onClick={handleClick}>
        {loading ? "Loading..." : "Save"}
      </Button>
    </div>
  );
};

export default ButtonAddRecord;
