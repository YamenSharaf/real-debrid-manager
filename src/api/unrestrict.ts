import fetch from "node-fetch";

import { UNRESTRICT_LINK } from ".";
import { ErrorResponse, UnrestrictLinkResponse } from "../schema";

export const requestUnrestrict = async (link: string, token: string): Promise<UnrestrictLinkResponse> => {
  const params = new URLSearchParams();
  params.append("link", link);

  const response = await fetch(UNRESTRICT_LINK, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      authorization: `Bearer ${token}`,
    },
    body: params,
  });

  if (!response.ok) {
    const { message, error } = (await response.json()) as ErrorResponse;
    throw new Error(`Something went wrong ${error || message || ""}`);
  }

  return (await response.json()) as Promise<UnrestrictLinkResponse>;
};
