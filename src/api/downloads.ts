import { DOWNLOADS_GET, DOWNLOAD_DELETE, DOWNLOAD_GET_STREAMING_INFO, fetch } from ".";
import { AxiosResponse } from "axios";
import { DownloadFileData, MediaData } from "../schema";

export const requestDownloads = async (): Promise<DownloadFileData[]> => {
  const response = await fetch.get(DOWNLOADS_GET);
  return response.data;
};

export const requestGetStreamingInfo = async (download_id: string): Promise<MediaData> => {
  const response = await fetch.get(DOWNLOAD_GET_STREAMING_INFO(download_id));
  return response.data;
};

export const requestDownloadDelete = async (download_id: string) => {
  const response: AxiosResponse<void> = await fetch.delete(DOWNLOAD_DELETE(download_id));

  return response;
};
