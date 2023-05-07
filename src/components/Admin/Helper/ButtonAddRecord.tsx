import React, { FC, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import {
  selectCourseFull,
  selectCourseImages,
  selectCourseIsSent,
  updateCourseImages,
  updateCourseIsSent,
} from "../../../store/slices/Admin/CourseSlice";
import { sendRecorde } from "../../../api/get-api";
import Swal from "sweetalert2";
import { sendCourseImagesToFirebase } from "../../../lib/uploadImage";
import { validateCourse, validateDiploma } from "../../../lib/validation";
import {
  AdminCourseType,
  GlobalCourseImagesStringType,
} from "../../../types/course";
import {
  selectDiplomaFull,
  selectDiplomaImages,
  selectDiplomaIsSent,
  updateDiplomaImages,
  updateDiplomaIsSent,
} from "../../../store/slices/Admin/DiplomSlice";
import {
  AdminDiplomaType,
  GlobalDiplomaImagesStringType,
} from "../../../types/deploma";
import { GlobalImagesFilesType } from "../../../pages/Admin/Courses/AddCourse";
import { PostResponse } from "../../../types/response";

interface Params {
  type: "Course" | "Diploma";
  images: GlobalImagesFilesType;
  actionType: "update" | "add";
  resetImages: () => void;
}

const ButtonAddRecord: FC<Params> = ({
  type,
  images,
  actionType,
  resetImages,
}) => {
  let data: AdminCourseType | AdminDiplomaType;
  let isSent: boolean;
  let stateImages: GlobalCourseImagesStringType | GlobalDiplomaImagesStringType;
  if (type === "Course") {
    data = useAppSelector(selectCourseFull);
    isSent = useAppSelector(selectCourseIsSent);
    stateImages = useAppSelector(selectCourseImages);
  } else if (type === "Diploma") {
    data = useAppSelector(selectDiplomaFull);
    isSent = useAppSelector(selectDiplomaIsSent);
    stateImages = useAppSelector(selectDiplomaImages);
  }

  const dispatch = useAppDispatch();

  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [canWeSend, setCanWeSend] = useState<boolean>(false);

  // step 2
  useEffect(() => {
    const sendCourse = async () => {
      try {
        if (isSent) return;
        if (!sent) {
          setSent(true);
          return;
        }

        if (type === "Course") validateCourse(data as AdminCourseType);
        else validateDiploma(data as AdminDiplomaType);

        await sendImages();
        setCanWeSend(true);
      } catch (err) {
        if (err instanceof Error) {
          Swal.fire(err.message, "need some modifications", "error");
        }
        setLoading(false);
      } finally {
        if (type === "Course") dispatch(updateCourseIsSent(false));
        else dispatch(updateDiplomaIsSent(false));
      }
    };
    sendCourse();
  }, [isSent]);

  // step 4
  useEffect(() => {
    if (!canWeSend) return;
    const fun = async () => {
      try {
        let res: PostResponse = await sendRecorde(data, type, actionType);
        // reset the images to prevent send them again
        resetImages();
        if (res.ok)
          Swal.fire(`The ${type} is Saved Successfully`, "Done!", "success");
        else {
          let msg = res.msg;
          if (msg.includes("duplicate key")) msg = `${type} Name is Duplicated`;
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

  // step 3
  const sendImages = async () => {
    const temp = await sendCourseImagesToFirebase(images, stateImages, type);
    if (type === "Course") {
      const finalImagesStrings = temp as GlobalCourseImagesStringType;
      dispatch(updateCourseImages(finalImagesStrings));
    } else {
      const finalImagesStrings = temp as GlobalDiplomaImagesStringType;
      dispatch(updateDiplomaImages(finalImagesStrings));
    }
  };

  // step 1
  const handleClick = async () => {
    Swal.fire("Uploading", `<p> Upload images + upload data </p>`, "question");
    if (type === "Course") dispatch(updateCourseIsSent(true));
    else dispatch(updateDiplomaIsSent(true));
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
