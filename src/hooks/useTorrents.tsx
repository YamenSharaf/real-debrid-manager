import { useFetch } from "@raycast/utils";
import {
  TORRENTS_GET,
  requestAddMagnet,
  requestAddTorrentFile,
  requestSelectTorrentFiles,
  requestTorrentDelete,
  requestTorrentDetails,
} from "../api";
import useToken from "./useToken";
import { TorrentItemData } from "../schema";

export const useTorrents = () => {
  const token = useToken();

  const getTorrents = () => {
    return useFetch<TorrentItemData[]>(TORRENTS_GET, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
  };

  const getTorrentDetails = (id: string) => {
    return requestTorrentDetails(id, token);
  };

  const deleteTorrent = (torrent_id: string) => {
    return requestTorrentDelete(torrent_id, token);
  };

  const uploadTorrentFile = (file_path: string) => {
    return requestAddTorrentFile(file_path, token);
  };

  const addTorrentMagnet = (file_path: string) => {
    return requestAddMagnet(file_path, token);
  };

  const selectTorrentFiles = (id: string, files?: string) => {
    return requestSelectTorrentFiles(id, token, files);
  };

  return { getTorrents, deleteTorrent, getTorrentDetails, uploadTorrentFile, addTorrentMagnet, selectTorrentFiles };
};

export default useTorrents;
