import React from "react";

import { useCookies } from "react-cookie";

export enum Query {
  name = "name",
  year = "year",
  email = "email"
}

const useViewer = () => {
  const [cookies] = useCookies([Query.name, Query.year, Query.email]);
  const viewer = (value: Query) => {
    return cookies[value];
  };
  const isLoggedIn = React.useMemo(() => cookies[Query.email] != null, [
    cookies
  ]);
  return { viewer, isLoggedIn };
};

export default useViewer;
