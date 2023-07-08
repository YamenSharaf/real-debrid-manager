import fetch from "node-fetch";
import { useFetch } from "@raycast/utils";
import { DELETE_DOWNLOAD, GET_DOWNLOADS } from "../api";
import useToken from "./useToken";
import { DownloadsData, ErrorResponse } from "../schema";

const requestDownloadDelete = async (download_id: string, token: string) => {
  const response = await fetch(DELETE_DOWNLOAD(download_id), {
    method: "DELETE",
    headers: {
      authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const { message, error } = (await response.json()) as ErrorResponse;
    throw new Error(`Something went wrong ${error || message || ""}`);
  }

  return response;
};

export const useDownloads = () => {
  const token = useToken();

  const getDownloads = () => {
    return useFetch<DownloadsData>(GET_DOWNLOADS, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
  };

  const deleteDownload = (download_id: string) => {
    return requestDownloadDelete(download_id, token);
  };

  return { getDownloads, deleteDownload };
};

export default useDownloads;
