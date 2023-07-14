import { DOWNLOAD_DELETE, fetch } from ".";
import { AxiosResponse } from "axios";

export const requestDownloadDelete = async (download_id: string) => {
  const response: AxiosResponse<void> = await fetch.delete(DOWNLOAD_DELETE(download_id));

  return response;
};
