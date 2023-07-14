import { UNRESTRICT_LINK, fetchAxios } from ".";
import { ErrorResponse, UnrestrictLinkResponse } from "../schema";

import { AxiosResponse, AxiosError } from "axios";

export const requestUnrestrict = async (link: string) => {
  try {
    const response: AxiosResponse<UnrestrictLinkResponse> = await fetchAxios.post(
      UNRESTRICT_LINK,
      { link },
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    return response.data as UnrestrictLinkResponse;
  } catch (e) {
    const axiosError = e as AxiosError<ErrorResponse>;
    const { message, error } = axiosError?.response?.data as ErrorResponse;
    throw new Error(`Something went wrong: ${error || message || ""}`);
  }
};
