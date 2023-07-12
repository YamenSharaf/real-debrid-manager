import { useFetch } from "@raycast/utils";
import { GET_DOWNLOADS, GET_STREAMING_INFO, requestDownloadDelete } from "../api";
import useToken from "./useToken";
import { DownloadsData, MediaData } from "../schema";

export const useDownloads = () => {
  const token = useToken();

  const getDownloads = () => {
    return useFetch<DownloadsData>(GET_DOWNLOADS, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
  };

  const getStreamingInfo = (download_id: string) => {
    return useFetch<MediaData>(GET_STREAMING_INFO(download_id), {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
  };

  const deleteDownload = (download_id: string) => {
    return requestDownloadDelete(download_id, token);
  };

  return { getDownloads, deleteDownload, getStreamingInfo };
};

export default useDownloads;
