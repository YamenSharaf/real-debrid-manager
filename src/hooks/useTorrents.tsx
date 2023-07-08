import fetch from "node-fetch";
import { useFetch } from "@raycast/utils";
import { DELETE_TORRENT, GET_TORRENTS } from "../api";
import useToken from "./useToken";
import { ErrorResponse, TorrentData } from "../schema";

const requestTorrentDelete = async (torrent_id: string, token: string) => {
  const response = await fetch(DELETE_TORRENT(torrent_id), {
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

export const useTorrents = () => {
  const token = useToken();

  const getTorrents = () => {
    return useFetch<TorrentData>(GET_TORRENTS, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
  };

  const deleteTorrent = (torrent_id: string) => {
    return requestTorrentDelete(torrent_id, token);
  };

  return { getTorrents, deleteTorrent };
};

export default useTorrents;
