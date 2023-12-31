import React, { useState } from "react";
import AuthContext from "./AuthContext";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("currentUser")),
  );

  const [userGroup, setUserGroup] = useState(
    localStorage.getItem('currentGroup')
  );

  const [userDynamo, setUserDynamo] = useState(
    JSON.parse(localStorage.getItem("userDynamo")),
  );

  const [admin, setAdmin] = useState(JSON.parse(localStorage.getItem('admin')));

  // User Methods
  const setUserDataHandler = (profile) => {
    setUser(profile);
  };

  const removeUserDataHandler = () => {
    setUser(null);
  };

  const setUserGroupHandler = (group) => {
    setUserGroup(group);
  };

  const removeUserGroupHandler = () => {
    setUserGroup('');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUserDataHandler,
        removeUserDataHandler,
        userDynamo,
        setUserDynamo,
        userGroup,
        setUserGroupHandler,
        removeUserGroupHandler,
        admin,
        setAdmin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
