import fs from "fs";
import fetch from "node-fetch";
import { TORRENT_ADD_FILE, TORRENT_DELETE, TORRENT_GET_STATUS, TORRENT_ADD_MAGNET, TORRENT_SELECT_FILES } from ".";
import { ErrorResponse, TorrentItemDataExtended, UnrestrictTorrentResponse } from "../schema";
export const requestTorrentDelete = async (torrent_id: string, token: string): Promise<void> => {
  const response = await fetch(TORRENT_DELETE(torrent_id), {
    method: "DELETE",
    headers: {
      authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const { message, error } = (await response.json()) as ErrorResponse;
    throw new Error(`Something went wrong ${error || message || ""}`);
  }
};

export const requestTorrentDetails = async (torrent_id: string, token: string): Promise<TorrentItemDataExtended> => {
  const response = await fetch(TORRENT_GET_STATUS(torrent_id), {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const { message, error } = (await response.json()) as ErrorResponse;
    throw new Error(`Something went wrong ${error || message || ""}`);
  }

  return (await response.json()) as TorrentItemDataExtended;
};

export const requestAddMagnet = async (magnetLink: string, token: string): Promise<UnrestrictTorrentResponse> => {
  const params = new URLSearchParams();
  params.append("magnet", magnetLink);

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

export const requestAddTorrentFile = async (file_path: string, token: string): Promise<UnrestrictTorrentResponse> => {
  const fileData = fs.readFileSync(file_path);

  const response = await fetch(TORRENT_ADD_FILE, {
    method: "PUT",
    headers: {
      authorization: `Bearer ${token}`,
      "Content-Type": "application/x-bittorrent",
    },
    body: fileData,
  });

  if (!response.ok) {
    const { message, error } = (await response.json()) as ErrorResponse;
    throw new Error(`Something went wrong ${error || message || ""}`);
  }

  return (await response.json()) as UnrestrictTorrentResponse;
};

export const requestSelectTorrentFiles = async (id: string, token: string, selectedFiles?: string) => {
  const params = new URLSearchParams();
  params.append("files", selectedFiles || "all");

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
