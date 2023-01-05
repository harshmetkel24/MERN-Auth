import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();

  const login = async (email, password) => {
    setIsLoading(true);
    setError(null);

    const response = await fetch("/api/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const json = await response.json(); // javascript object response

    // response has state of ok if successfull

    if (!response.ok) {
      setIsLoading(false);
      setError(json.error);
    } else {
      // save the user (token) to local-storage
      localStorage.setItem("user", JSON.stringify(json)); // store string version into local-storage

      // update the auth context
      dispatch({
        type: "LOGIN",
        payload: json,
      });

      setIsLoading(false);
    }
  };

  return { login, isLoading, error };
};
