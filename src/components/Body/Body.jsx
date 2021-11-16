import React from "react";
import Searchbar from "./Searchbar/Searchbar";
import UserInfo from "./UserInfo/UserInfo";
import UserProfile from "./UserProfile/UserProfile";

const Body = () => {
  return (
    <>
      <section>
        <Searchbar />
      </section>
      <section>
        <UserInfo />
      </section>
      <section>
        <UserProfile />
      </section>
    </>
  );
};

export default Body;
