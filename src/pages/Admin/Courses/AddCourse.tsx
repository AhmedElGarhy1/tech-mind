import React, { FC, useEffect, useState } from "react";
import OverviewSection from "../../../components/Admin/Helper/OverviewSection";
import Info from "../../../components/Admin/Helper/Info";
import CourseMetaData from "../../../components/Admin/Courses/CourseMetaData";
import WhatWillYouLearn from "../../../components/Admin/Helper/WhatWillYouLearn";
import IsDependentCourse from "../../../components/Admin/Courses/IsDependentCourse";
import CourseObjectives from "../../../components/Admin/Courses/CourseObjectives";
import Questions from "../../../components/Admin/Helper/Questions";
import WhoIsThisCourseFor from "../../../components/Admin/Helper/whoIsThisCourseFor";
import ButtonAddRecord from "../../../components/Admin/Helper/ButtonAddRecord";
import AdminRelatedCourses from "../../../components/Admin/Courses/RelatedCourses";
import { useAppDispatch } from "../../../store/hooks";
import { resetCourse } from "../../../store/slices/Admin/CourseSlice";

export interface GlobalImagesFilesType {
  icon: File;
  main_img: File;
  other_src: File;
  objectives: File[];
}

interface Params {
  type: "update" | "add";
}

const AddCourse: FC<Params> = ({ type: actionType }) => {
  const type = "Course";
  const dispatch = useAppDispatch();
  const [globalImages, setGlobalImages] = useState<GlobalImagesFilesType>({
    icon: null,
    main_img: null,
    other_src: null,
    objectives: [null],
  });

  useEffect(() => {
    if (actionType === "add") dispatch(resetCourse());
  }, []);

  const setIcon = (image: File) =>
    setGlobalImages((p) => ({ ...p, icon: image }));

  const setMainImage = (image: File) =>
    setGlobalImages((p) => ({ ...p, main_img: image }));

  const setOtherSrc = (image: File) =>
    setGlobalImages((p) => ({ ...p, other_src: image }));

  const setObjectivesImage = (images: File[]) =>
    setGlobalImages((p) => ({ ...p, objectives: [...images] }));

  const resetGlobalImages = () =>
    setGlobalImages({
      icon: null,
      main_img: null,
      objectives: [null],
      other_src: null,
    });

  return (
    <div className="update-page d-flex flex-column gap-4 mt-3">
      {actionType === "update" && (
        <div className="bg-white rounded-2 p-3 pe-5">
          <div className="w-100">
            <AdminRelatedCourses />
          </div>
        </div>
      )}
      <div className="bg-white rounded-2 p-3 pe-5">
        <div className="w-100">
          <Info type={type} setImage={setIcon} />
        </div>
      </div>
      <div className="bg-white rounded-2 p-3 pe-5">
        <div className="w-100">
          <CourseMetaData />
        </div>
      </div>
      <div className="bg-white rounded-2 p-3 pe-5">
        <div className="w-100">
          <OverviewSection setImage={setMainImage} type={type} />
        </div>
      </div>
      <div className="bg-white rounded-2 p-3 pe-5">
        <div className="w-100">
          <CourseObjectives setImages={setObjectivesImage} />
        </div>
      </div>
      <div className="bg-white rounded-2 p-3 pe-5">
        <div className="w-100">
          <WhatWillYouLearn setImage={setOtherSrc} type={type} />
        </div>
      </div>
      <div className="bg-white rounded-2 p-3 pe-5">
        <div className="w-100">
          <WhoIsThisCourseFor type={type} />
        </div>
      </div>
      <div
        style={{
          background: "#33333333",
        }}
        className="rounded-2 p-3 pe-5">
        <div className="w-100">
          <IsDependentCourse />
        </div>
      </div>
      <div className="bg-white rounded-2 p-3 pe-5">
        <div className="w-100">
          <Questions type={type} />
        </div>
      </div>

      <ButtonAddRecord
        images={globalImages}
        type="Course"
        actionType={actionType}
        resetImages={resetGlobalImages}
      />
    </div>
  );
};

export default AddCourse;
