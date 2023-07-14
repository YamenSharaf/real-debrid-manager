import { usePromise } from "@raycast/utils";
import { requestDownloadDelete, requestDownloads, requestGetStreamingInfo } from "../api";
import { Toast, showToast } from "@raycast/api";

export const useDownloads = () => {
  const getDownloads = () => {
    return usePromise(requestDownloads);
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
    return usePromise(requestGetStreamingInfo, [download_id], {
      execute: isPlayable && !isYouTube,
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
