import React, { useEffect, useState } from "react";
import axios from "axios";
import { UserType } from "../../types/UserType";
import { useParams } from "react-router";

function UserInformation() {
  const [information, setInformation] = useState<UserType | null>(null);
  const { userID } = useParams();

  useEffect(() => {
    async function fetchUserData() {
      const respons = await axios.get(`https://reqres.in/api/users/${userID}`);
      setInformation(respons.data.data);
    }
    fetchUserData();
  }, []);

  return (
    <div className="w-5/12 m-auto mt-28 flex justify-around border-2 p-8">
      <div className="w-1/2">
        <img
          src={information?.avatar}
          alt="pic"
          className="w-[32rem] rounded-lg"
        />
      </div>
      <div className="w-1/2 text-center flex flex-col justify-center gap-y-8">
        <p className="text-2xl">
          {information?.first_name} {information?.last_name}
        </p>
        <p className="text-sm">{information?.email}</p>
        <p>CEO</p>
      </div>
    </div>
  );
}

export default UserInformation;
