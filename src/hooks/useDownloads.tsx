import { useFetch } from "@raycast/utils";
import { GET_DOWNLOADS } from "../api";
import useToken from "./useToken";
import { DownloadsData } from "../schema";

export const useDownloads = () => {
  const token = useToken();

  const getDownloads = () => {
    return useFetch<DownloadsData>(GET_DOWNLOADS, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
  };

  return { getDownloads };
};

export default useDownloads;
