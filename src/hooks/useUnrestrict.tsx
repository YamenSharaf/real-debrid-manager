import fetch from "node-fetch";
import { GET_STATUS, SELECT_FILES, UNRESTRICT_LINK, UNRESTRICT_MAGNET } from "../api";
import useToken from "./useToken";
import { LinkType } from "../schema";

type ErrorResponse = {
  error?: string;
  message?: string;
  error_code?: number;
};

const requestUnrestrict = async (link: string, token: string, type: LinkType = "link") => {
  const endpoint = type === "link" ? UNRESTRICT_LINK : UNRESTRICT_MAGNET;
  const params = new URLSearchParams();
  params.append(type, link);

  const response = await fetch(endpoint, {
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

  return response.json();
};
const requestSelectFiles = async (id: string, token: string, selectedFiles?: string) => {
  const params = new URLSearchParams();
  params.append("files", selectedFiles || "all");

  const response = await fetch(SELECT_FILES(id), {
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

const requestTorrentStatus = async (torrent_id: string, token: string) => {
  const response = await fetch(GET_STATUS(torrent_id), {
    // method: "POST",
    headers: {
      // "Content-Type": "application/x-www-form-urlencoded",
      authorization: `Bearer ${token}`,
    },
    // body: params,
  });

  if (!response.ok) {
    const { message, error } = (await response.json()) as ErrorResponse;
    throw new Error(`Something went wrong ${error || message || ""}`);
  }

  return response.json();
};

export const useUnrestrict = () => {
  const token = useToken();

  const unRestrictLink = (link: string, type: LinkType) => {
    return requestUnrestrict(link, token, type);
  };
  const getTorrentStatus = (id: string) => {
    return requestTorrentStatus(id, token);
  };

  const selectTorrentFiles = (id: string, files?: string) => {
    return requestSelectFiles(id, token, files);
  };

  const unRestrictLinks = async (links: string[], type: LinkType) => {
    const results = await Promise.allSettled(links.map((link) => unRestrictLink(link, type)));
    return results;
  };

  return {
    unRestrictLink,
    unRestrictLinks,
    getTorrentStatus,
    selectTorrentFiles,
  };
};

export default useUnrestrict;
