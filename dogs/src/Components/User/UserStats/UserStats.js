import React, { lazy, Suspense, useEffect } from "react";

import useFetch from "../../../Hooks/useFetch";
import { STATS_GET } from "../../../api/api";
import Head from "../../../Helper/Head/Head";
import Loading from "../../UI/Loading/Loading";
import Error from "../../UI/Error/Error";
const UserStatsGraph = lazy(() => import("../UserStatsGraph/UserStatsGraph"));

const UserStats = () => {
  const { data, error, loading, request } = useFetch();

  useEffect(() => {
    const getData = async () => {
      const { url, options } = STATS_GET();
      await request(url, options);
    };

    getData();
  }, [request]);

  if (loading) return <Loading />;
  if (error) return <Error error={error} />;

  if (data?.length)
    return (
      <Suspense fallback={<div></div>}>
        <Head title="Estatísticas" description="Estatísticas do site dogs" />
        <UserStatsGraph data={data} />
      </Suspense>
    );
  else return null;
};

export default UserStats;
