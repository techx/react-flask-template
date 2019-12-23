import React from "react";

import { useCookies } from "react-cookie";

export enum Query {
  name = "name",
  email = "email",
  uid = "uid"
}

const useViewer = () => {
  const [cookies] = useCookies([Query.name, Query.email, Query.uid]);
  const viewer = (value: Query) => {
    return cookies[value];
  };
  const isLoggedIn = React.useMemo(() => cookies[Query.uid] != null, [cookies]);
  return { viewer, isLoggedIn };
};

export default useViewer;
