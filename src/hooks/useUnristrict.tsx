import { usePromise } from "@raycast/utils";
import useToken from "./useToken";
import fetch from "node-fetch";
import { UNRESTRICT } from "../api";

const request = async (link: string, token: string) => {
  const body = new FormData();
  body.append("link", link);

  const response = await fetch(UNRESTRICT, {
    method: "POST",
    headers: {
      authorization: `Bearer ${token}`,
    },
    body,
  });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  return response.json();
};

export const useUnrestrict = (link: string) => {
  const token = useToken();
  const unRestrictLink = () => {
    return usePromise(request, [link, token], {
      execute: true,
      onError: (error: Error) => {
        console.error("Error occurred:", error);
      },
      onData: (data: any) => {
        console.log("Data received:", data);
      },
      onWillExecute: () => {
        console.log("Will execute the request");
      },
    });
  };

  return {
    unRestrictLink,
  };
};

export default useUnrestrict;
