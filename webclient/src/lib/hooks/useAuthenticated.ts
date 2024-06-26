import { useCallback, useEffect, useState } from "react";
import useSWR from "swr";
import { HOST } from "../utils";

const USER_ANONYMOUS = "anonymousUser";

const getUsername = async (url: string) => {
  try {
    const response = await fetch(url, {
      credentials: "include",
    });

    const username = await response.text();
    if (response.ok && !username.startsWith("<!doctype html>")) {
      return username;
    }
  } catch(error) {
    console.error("error getting username", error);
  }

  return null;
}

const doLogin = async (username: string, password: string) => {
  const loginFormData = new URLSearchParams();
  loginFormData.append("j_username", username);
  loginFormData.append("j_password", password);

  return fetch(`${HOST}/pentaho/j_spring_security_check`, {
    method: "post",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    credentials: "include",
    body: loginFormData.toString()
  });
}

export default () => {
  const [username, setUsername] = useState(USER_ANONYMOUS);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const {
    data,
    isLoading,
    mutate,
    ...others
  } = useSWR(() => `${HOST}/pentaho/api/session/userName`, getUsername);

  useEffect(() => {
    if (!isLoading && data != null) {
      setUsername(data);
      setIsAuthenticated(data !== USER_ANONYMOUS);
    }
  }, [data, isLoading]);

  const login = useCallback(async (username: string, password: string) => {
    try {
      const response = await doLogin(username, password);

      if (response.ok) {
        await mutate();
        return true;
      }
    } catch (error) {
      console.error("error on login", error);
    }

    return isAuthenticated;
  }, []);

  return {
    isAuthenticated,
    isLoading,
    login,
    mutate,
    username,
    ...others
  };
}
