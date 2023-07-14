import { useFetch } from "@raycast/utils";
import { DOWNLOADS_GET, DOWNLOAD_GET_STREAMING_INFO, requestDownloadDelete } from "../api";
import useToken from "./useToken";
import { DownloadsData, MediaData } from "../schema";
import { Toast, showToast } from "@raycast/api";

export const useDownloads = () => {
  const token = useToken();

  const getDownloads = () => {
    return useFetch<DownloadsData>(DOWNLOADS_GET, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
  };

  const getStreamingInfo = (
    download_id: string,
    {
      isPlayable,
      isYouTube,
    }: {
      isPlayable?: boolean;
      isYouTube?: boolean;
    } = {}
  ) => {
    return useFetch<MediaData>(DOWNLOAD_GET_STREAMING_INFO(download_id), {
      execute: isPlayable && !isYouTube,
      headers: {
        authorization: `Bearer ${token}`,
      },
      onWillExecute: async () => {
        await showToast(Toast.Style.Animated, "Fetching metadata");
      },
      onError: async () => {
        await showToast(Toast.Style.Failure, "No metadata");
      },
      onData: async () => {
        await showToast(Toast.Style.Success, "Metadata found");
      },
    });
  };

  const deleteDownload = (download_id: string) => {
    return requestDownloadDelete(download_id);
  };

  return { getDownloads, deleteDownload, getStreamingInfo };
};

export default useDownloads;
