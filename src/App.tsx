import React from "react";
import { Routes, Route } from "react-router-dom";
import User from "./components/User/User";
import UserInformation from "./components/UserInformation/UserInformation";
function App() {
  return (
    <Routes>
      <Route path="/" element={<User />} />
      <Route path="/user/:userID" element={<UserInformation />} />
    </Routes>
  );
}

export default App;
