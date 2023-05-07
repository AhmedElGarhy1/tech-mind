import { faSearch } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { FC, useEffect, useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import { filterRecords } from "../../../lib/utils";
import AdminCourseRows from "../../../components/Admin/Courses/AdminCourseRows";
import { deleteCourse, deleteDiploma } from "../../../api/get-api";
import { PostResponse } from "../../../types/response";
import { deleteImage } from "../../../lib/uploadImage";
import { DiplomaCardType } from "../../../components/Diplomas/DiplomaCard";
import AdminDiplomaRows from "../../../components/Admin/Diplomas/AdminDiplomaRows";

const AllDiplomas: FC = () => {
  const data = useLoaderData() as DiplomaCardType[];
  const [allData, setAllData] = useState<DiplomaCardType[]>(data || []);
  const [diplomas, setDiplomas] = useState<DiplomaCardType[]>(data || []);
  const [error, setError] = useState<string | null>(null);

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const q = event.target.value.trim();
    const newDiplomas = filterRecords(allData, q) as DiplomaCardType[];
    setDiplomas(newDiplomas);
  };

  const handleDelete = async (id: string, img: string) => {
    const confirmation = await Swal.fire({
      icon: "question",
      title: "Delete?",
      html: "Are you sure you want to delete?",
      showDenyButton: true,
    });

    if (!confirmation.isConfirmed) return;

    const response: PostResponse = await deleteDiploma(id);
    deleteImage(img, "Diploma");
    if (!response.ok) {
      setError(response.msg);
      setTimeout(() => {
        setError(null);
      }, 3000);
      return;
    }
    Swal.fire("Deleted", "Successfully Deleted", "success");
    setDiplomas((prev) => [...prev].filter((e) => e._id !== id));
    setAllData((prev) => [...prev].filter((e) => e._id !== id));
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mt-5 mb-4">
        <h1>Diplomas</h1>
        <Link className="btn btn-primary" to="add">
          Add Diploma
        </Link>
      </div>
      <div className="position-relative mt-2">
        <input
          className="d-block w-100 bg-transparent shadow-none rounded-1 py-2 input-border"
          type="text"
          placeholder="Search..."
          onChange={handleQueryChange}
          style={{
            outline: "none",
            paddingLeft: 33,
          }}
        />
        <FontAwesomeIcon
          className="position-absolute"
          icon={faSearch}
          style={{
            top: 13,
            left: 10,
            fontSize: 18,
          }}
        />
      </div>
      {error && <p className="text-center text-danger mt-2">{error}</p>}
      <AdminDiplomaRows diplomas={diplomas} handleDelete={handleDelete} />
    </div>
  );
};

export default AllDiplomas;
