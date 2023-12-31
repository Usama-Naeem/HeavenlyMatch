import React from "react";

const AuthContext = React.createContext({
  user: {},
  setUserDataHandler: () => {},
  removeUserDataHandler: () => {},
  userDynamo: {},
  setUserDynamo: () => {},
  userGroup: '',
  setUserGroupHandler: () => {},
  removeUserGroupHandler: () => {},
  pagePermissions: [],
  setActivePermissionPageHandler: () => {},
  admin: {},
  setAdmin: () => {},
});

export default AuthContext;
