import React from "react";
import AllReservationRows from "../../components/Admin/Reservations/AllReservationRows";
import { useLoaderData } from "react-router-dom";
import type { ReservationType } from "../../types/reservation";

const Reservations = () => {
  const data = (useLoaderData() as any).data as ReservationType[];

  return (
    <div>
      <h1 className=" mt-5 mb-5">Registration</h1>
      {/* <AllReservationRows /> */}
    </div>
  );
};

export default Reservations;
