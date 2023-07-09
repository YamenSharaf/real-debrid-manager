import { TorrentStatus, UnrestrictLinkResponse } from "../schema";

export const formatProgress = (progress: number) => {
  if (!progress) return "Unknown";
  if (progress === 100) return "Completed";

  return `${progress}%`;
};

export const isUnrestrictedTorrent = (response: UnrestrictLinkResponse) => {
  return Boolean(response?.id && response?.uri);
};

export const isUnrestrictedHosterLink = (response: UnrestrictLinkResponse) => {
  return Boolean(response?.id && response?.host);
};

export const isTorrentPendingFileSelection = (torrentStatus: TorrentStatus) => {
  return torrentStatus === "magnet_conversion" || torrentStatus === "waiting_files_selection";
};
export const isTorrentCompleted = (torrentStatus: TorrentStatus) => {
  return torrentStatus === "downloaded" || torrentStatus === "uploading";
};
