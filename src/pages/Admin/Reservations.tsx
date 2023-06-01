import React, { useLayoutEffect, useState } from "react";
import AllReservationRows from "../../components/Admin/Reservations/AllReservationRows";
import { useLoaderData } from "react-router-dom";
import type { ReservationType } from "../../types/reservation";
import { deleteReservation, getAllReservations } from "../../api/get-api";
import LoadingButton from "../../components/teach/LoadingButton";
import { PostResponse } from "../../types/response";
import Swal from "sweetalert2";

const Reservations = () => {
  const data = (useLoaderData() as any).data as ReservationType[];
  const [registrations, setRegistrations] = useState<ReservationType[]>([]);

  const [page, setPage] = useState<number>(1);
  const [haveLoad, setHaveLoad] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);

  useLayoutEffect(() => {
    if (page === 1) {
      if (data.length < 20) setHaveLoad(false);
      return setRegistrations(data || []);
    }

    const getMoreCourses = async (pageNum: number) => {
      try {
        setLoading(true);
        const temp = await getAllReservations(pageNum);
        setLoading(false);
        const tempMessages = temp.data;
        if (!(tempMessages && tempMessages.length > 0))
          return setHaveLoad(false);
        if (tempMessages.length < 20) setHaveLoad(false);
        setRegistrations((p) => [...p, ...tempMessages]);
      } catch (err) {
        console.log("ERROR");
      }
    };

    getMoreCourses(page);
  }, [page]);

  const handleDelete = async (id: string) => {
    const confirmation = await Swal.fire({
      icon: "question",
      title: "Delete?",
      html: "Are you sure you want to delete?",
      showDenyButton: true,
    });

    if (!confirmation.isConfirmed) return;

    deleteReservation(id).then((response) => {
      const temp = response as PostResponse;
      if (!temp.ok) return Swal.fire("Sorry", temp.msg, "error");
      Swal.fire("Deleted", temp.msg, "success");
      setRegistrations((p) => [...p].filter((ele) => ele._id !== id));
    });
  };

  return (
    <div>
      <h1 className=" mt-5 mb-5">Registration</h1>
      <AllReservationRows handleDelete={handleDelete} list={registrations} />
      {haveLoad && <LoadingButton loading={loading} setPage={setPage} />}
    </div>
  );
};

export default Reservations;
