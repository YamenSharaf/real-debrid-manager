import { DOWNLOAD_DELETE, fetchAxios } from ".";
import { AxiosResponse } from "axios";

export const requestDownloadDelete = async (download_id: string) => {
  const response: AxiosResponse<void> = await fetchAxios.delete(DOWNLOAD_DELETE(download_id));

  return response;
};
