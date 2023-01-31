import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { DeplomaCourses } from "../../components/Deploma";
import Hero from "../../components/Hero";
import Overview from "../../components/Overview";
import { deplomasData, DeplomasType } from "../../data/deplomas";

const SingleDeploma = () => {
  const { id } = useParams();
  const [deploma, setDeploma] = useState<DeplomasType>(null);
  useEffect(() => {
    const currentDeploma = deplomasData.find((d) => d.id === id);
    if (!currentDeploma) return;

    setDeploma(currentDeploma);
  }, []);

  return (
    <div>
      {deploma && (
        <>
          <Hero
            name={deploma.name}
            description={deploma.description}
            href={deploma.href}
          />
          <Overview deploma={deploma} />
          <DeplomaCourses />
        </>
      )}
    </div>
  );
};

export default SingleDeploma;
