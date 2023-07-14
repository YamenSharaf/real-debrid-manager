import fs from "fs";
import fetch from "node-fetch";
import {
  TORRENT_ADD_FILE,
  TORRENT_DELETE,
  TORRENT_GET_STATUS,
  TORRENT_ADD_MAGNET,
  TORRENT_SELECT_FILES,
  fetchAxios,
} from ".";
import { ErrorResponse, TorrentItemDataExtended, UnrestrictTorrentResponse } from "../schema";
import { AxiosResponse } from "axios";

export const requestTorrentDelete = async (torrent_id: string) => {
  const response: AxiosResponse<void> = await fetchAxios.delete(TORRENT_DELETE(torrent_id));
  return response;
};

export const requestTorrentDetails = async (torrent_id: string) => {
  const response: AxiosResponse<TorrentItemDataExtended> = await fetchAxios.get(TORRENT_GET_STATUS(torrent_id));

  return response;
};

export const requestAddMagnet = async (magnet_link: string, token: string): Promise<UnrestrictTorrentResponse> => {
  const params = new URLSearchParams();
  params.append("magnet", magnet_link);

  const response = await fetch(TORRENT_ADD_MAGNET, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      authorization: `Bearer ${token}`,
    },
    body: params,
  });

  if (!response.ok) {
    const { message, error } = (await response.json()) as ErrorResponse;
    throw new Error(`Something went wrong ${error || message || ""}`);
  }

  return (await response.json()) as UnrestrictTorrentResponse;
};

export const requestAddTorrentFile = async (file_path: string) => {
  const file_data = fs.readFileSync(file_path);

  const response: AxiosResponse<UnrestrictTorrentResponse> = await fetchAxios.put(TORRENT_ADD_FILE, file_data, {
    headers: {
      "Content-Type": "application/x-bittorrent",
    },
  });

  return response;
};

export const requestSelectTorrentFiles = async (id: string, token: string, selected_files?: string) => {
  const params = new URLSearchParams();
  params.append("files", selected_files || "all");

  const response = await fetch(TORRENT_SELECT_FILES(id), {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      authorization: `Bearer ${token}`,
    },
    body: params,
  });

  if (!response.ok) {
    const { message, error } = (await response.json()) as ErrorResponse;
    throw new Error(`Something went wrong ${error || message || ""}`);
  }

  return response;
};
