import React, { FC, useEffect, useState } from "react";
import OverviewSection from "../../../components/Admin/Helper/OverviewSection";
import Info from "../../../components/Admin/Helper/Info";
import WhatWillYouLearn from "../../../components/Admin/Helper/WhatWillYouLearn";
import Questions from "../../../components/Admin/Helper/Questions";
import WhoIsThisCourseFor from "../../../components/Admin/Helper/whoIsThisCourseFor";
import ButtonAddRecord from "../../../components/Admin/Helper/ButtonAddRecord";
import { useAppDispatch } from "../../../store/hooks";
import { CourseObjectivesType } from "../../../store/slices/Admin/CourseSlice";
import AdminDiplomaCourses from "../../../components/Admin/Diplomas/AdminDiplomaCourses";
import { resetDiploma } from "../../../store/slices/Admin/DiplomSlice";

export interface GlobalImagesFilesType {
  icon: File;
  main_img: File;
  other_src: File;
  objectives: File[];
}

interface Params {
  type: "update" | "add";
  courses?: CourseObjectivesType[];
}

const AddDiploma: FC<Params> = ({ type: actionType, courses }) => {
  const type = "Diploma";
  const dispatch = useAppDispatch();
  const [globalImages, setGlobalImages] = useState<GlobalImagesFilesType>({
    icon: null,
    main_img: null,
    other_src: null,
    objectives: [null],
  });

  useEffect(() => {
    if (actionType === "add") dispatch(resetDiploma());
  }, []);

  const setMainImage = (image: File) =>
    setGlobalImages((p) => ({ ...p, main_img: image }));

  const setOtherSrc = (image: File) =>
    setGlobalImages((p) => ({ ...p, other_src: image }));

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
            <AdminDiplomaCourses courses={courses} />
          </div>
        </div>
      )}
      <div className="bg-white rounded-2 p-3 pe-5">
        <div className="w-100">
          <Info type={type} />
        </div>
      </div>

      <div className="bg-white rounded-2 p-3 pe-5">
        <div className="w-100">
          <OverviewSection setImage={setMainImage} type={type} />
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

      <div className="bg-white rounded-2 p-3 pe-5">
        <div className="w-100">
          <Questions type={type} />
        </div>
      </div>

      <ButtonAddRecord
        images={globalImages}
        type={type}
        actionType={actionType}
        resetImages={resetGlobalImages}
      />
    </div>
  );
};

export default AddDiploma;
