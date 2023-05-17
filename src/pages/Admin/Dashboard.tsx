import React, { FC, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard: FC = () => {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/admin/registrations");
  }, []);
  return <>Hello wolrd</>;
};

export default Dashboard;
