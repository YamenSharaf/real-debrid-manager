import fetch from "node-fetch";

import { DOWNLOAD_DELETE } from ".";
import { ErrorResponse } from "../schema";

export const requestDownloadDelete = async (download_id: string, token: string): Promise<void> => {
  const response = await fetch(DOWNLOAD_DELETE(download_id), {
    method: "DELETE",
    headers: {
      authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const { message, error } = (await response.json()) as ErrorResponse;
    throw new Error(`Something went wrong ${error || message || ""}`);
  }
};
