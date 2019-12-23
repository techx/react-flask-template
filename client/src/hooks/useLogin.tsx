import { useCookies } from "react-cookie";
import ServerHelper, { ServerURL } from "./../components/ServerHelper";

const useLogin = () => {
  const [cookies, setCookie, removeCookie] = useCookies([
    "token",
    "uid",
    "email",
    "name"
  ]);

  const redirectToDopeAuth = (data?: [string, string][]) => {
    let otherdata = "";
    if (data != null) {
      data.forEach(value => {
        otherdata += `${value[0]}=${value[1]}&`;
      });
    }
    if (otherdata.length > 0) {
      otherdata = `?${otherdata.substring(0, otherdata.length - 1)}`;
    }
    window.location.href =
      "https://dopeauth.com/login/" +
      encodeURIComponent(
        (process.env.REACT_APP_SITEURL || "") + "/login/auth"
      ) +
      otherdata;
  };

  const login = async (
    uid: string,
    email: string,
    token: string
  ): Promise<Boolean> => {
    try {
      const config = {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: email,
          token: token,
          uid: uid
        })
      };
      // // This is a client side check, however server side checks are also necessary!
      // // Here we don't do a callback verify but on server side we want it
      // const response = await fetch(
      //   "https://dopeauth.com/api/v1/site/verify",
      //   config
      // );
      // if (response.ok) {
      //   const json = await response.json();
      //   if (json["success"]) {
      //     setCookie("token", token, { path: "/" });
      //     setCookie("uid", uid, { path: "/" });
      //     setCookie("email", email, { path: "/" });
      //     setCookie("name", email, { path: "/" });
      //     return true;
      //   }
      // }
      // You can also chose to do a server side check~ and have clients
      const json = await ServerHelper.post(ServerURL.login, {
        email: email,
        token: token,
        uid: uid
      });
      if (json["success"]) {
        setCookie("token", json["token"], { path: "/" });
        setCookie("uid", json["uid"], { path: "/" });
        setCookie("email", json["email"], { path: "/" });
        return true;
      }
    } catch (error) {}
    return false;
  };
  const getCredentials = () => {
    return {
      email: cookies["email"],
      uid: cookies["uid"],
      token: cookies["token"]
    };
  };
  const logout = () => {
    removeCookie("name");
    removeCookie("token");
    removeCookie("uid");
    removeCookie("email");
  };
  return { redirectToDopeAuth, getCredentials, login, logout };
};

export default useLogin;
