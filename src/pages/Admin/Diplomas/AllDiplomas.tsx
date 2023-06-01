import { faSearch } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { FC, useEffect, useLayoutEffect, useRef, useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import { filterRecords } from "../../../lib/utils";
import { deleteDiploma, getAllDiplomas } from "../../../api/get-api";
import { PostResponse } from "../../../types/response";
import { DiplomaCardType } from "../../../components/Diplomas/DiplomaCard";
import AdminDiplomaRows from "../../../components/Admin/Diplomas/AdminDiplomaRows";
import LoadingButton from "../../../components/teach/LoadingButton";

const controller = new AbortController();

const AllDiplomas: FC = () => {
  const basicDiplomas = useLoaderData() as DiplomaCardType[];

  const [queryLoading, setQueryLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [diplomas, setDiplomas] = useState<DiplomaCardType[]>(
    basicDiplomas || []
  );
  const [error, setError] = useState<string | null>(null);

  const [page, setPage] = useState<number>(1);
  const [haveLoad, setHaveLoad] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);

  const handleQueryChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setQueryLoading(true);
    const q = event.target.value;
    setQuery(q);
    setPage(1);
    try {
      controller.abort();
      const newDiplomas = await getAllDiplomas(1, q, controller.signal, true);
      setDiplomas(newDiplomas);
      setQueryLoading(false);
      setHaveLoad(true);
    } catch (err) {
      setQueryLoading(false);
      console.log("SOMTHING WENT WRONG");
    }
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
    if (!response.ok) {
      setError(response.msg);
      setTimeout(() => {
        setError(null);
      }, 3000);
      return;
    }
    Swal.fire("Deleted", "Successfully Deleted", "success");
    setDiplomas((prev) => [...prev].filter((e) => e._id !== id));
  };

  useLayoutEffect(() => {
    if (page === 1) {
      if (basicDiplomas.length < 20) setHaveLoad(false);
      return setDiplomas(basicDiplomas || []);
    }

    const getMoreCourses = async (pageNum: number) => {
      try {
        setLoading(true);
        const tempCourses = await getAllDiplomas(pageNum, query);
        setLoading(false);
        if (!(tempCourses && tempCourses.length > 0)) return setHaveLoad(false);
        if (tempCourses.length < 20) setHaveLoad(false);
        setDiplomas((p) => [...p, ...tempCourses]);
      } catch (err) {
        console.log("ERROR");
      }
    };

    getMoreCourses(page);
  }, [page]);

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
      {queryLoading ? (
        "Loading..."
      ) : (
        <AdminDiplomaRows diplomas={diplomas} handleDelete={handleDelete} />
      )}
      {haveLoad && <LoadingButton loading={loading} setPage={setPage} />}
    </div>
  );
};

export default AllDiplomas;
