import { useFetch } from "@raycast/utils";
import { GET_TORRENTS } from "../api";
import useToken from "./useToken";
import { TorrentData } from "../schema";

export const useTorrents = () => {
  const token = useToken();

  const getTorrents = () => {
    return useFetch<TorrentData>(GET_TORRENTS, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
  };

  const moveToDownloads = (id: string) => {
    return useFetch<TorrentData>(GET_TORRENTS, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
  };

  return { getTorrents, moveToDownloads };
};

export default useTorrents;
