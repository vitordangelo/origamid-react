import React, { useContext } from "react";
import UserHeader from "./UserHeader/UserHeader";
import { Routes, Route } from "react-router-dom";

import Feed from "../Feed/Feed";
import UserPhotoPost from "./UserPhotoPost/UserPhotoPost";
import UserStats from "./UserStats/UserStats";
import UserContext from "../../UserContext";
import NotFound from "../NoutFound/NotFound";

const User = () => {
  const { data } = useContext(UserContext);

  return (
    <section className="container">
      <UserHeader />
      <Routes>
        <Route path="/" element={<Feed user={data.id} />} />
        <Route path="postar" element={<UserPhotoPost />} />
        <Route path="estatisticas" element={<UserStats />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </section>
  );
};

export default User;
