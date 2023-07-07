import fetch from "node-fetch";
import { UNRESTRICT } from "../api";
import useToken from "./useToken";

type ErrorResponse = {
  error?: string;
  message?: string;
  error_code?: number;
};

const requestUnrestrict = async (link: string, token: string) => {
  const params = new URLSearchParams();
  params.append("link", link);

  const response = await fetch(UNRESTRICT, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Bearer ${token}`,
    },
    body: params,
  });

  if (!response.ok) {
    const { message, error } = (await response.json()) as ErrorResponse;
    throw new Error(`Something went wrong ${error || message || ""}`);
  }

  return response.json();
};

export const useUnrestrict = () => {
  const token = useToken();

  const unRestrictLink = (link: string) => {
    return requestUnrestrict(link, token);
  };

  const unRestrictLinks = async (links: string[]) => {
    const results = await Promise.allSettled(links.map(unRestrictLink));
    return results;
  };

  return {
    unRestrictLink,
    unRestrictLinks,
  };
};

export default useUnrestrict;
