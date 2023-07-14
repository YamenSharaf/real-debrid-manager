export const API_BASE_URL = "https://api.real-debrid.com/rest/1.0";

// User Account
export const USER_GET = `${API_BASE_URL}/user`;
export const TRAFFIC_GET = `${API_BASE_URL}/traffic`;

// Downloads
export const DOWNLOADS_GET = `${API_BASE_URL}/downloads?limit=200`;
export const DOWNLOAD_DELETE = (download_id: string) => `${API_BASE_URL}/downloads/delete/${download_id}`;
export const DOWNLOAD_GET_STREAMING_INFO = (download_id: string) =>
  `${API_BASE_URL}/streaming/mediaInfos/${download_id}`;

// Torrents
export const TORRENTS_GET = `${API_BASE_URL}/torrents?limit=200`;
export const TORRENT_ADD_FILE = `${API_BASE_URL}/torrents/addTorrent`;
export const TORRENT_ADD_MAGNET = `${API_BASE_URL}/torrents/addMagnet`;
export const TORRENT_GET_STATUS = (torrent_id: string) => `${API_BASE_URL}/torrents/info/${torrent_id}`;
export const TORRENT_SELECT_FILES = (torrent_id: string) => `${API_BASE_URL}/torrents/selectFiles/${torrent_id}`;
export const TORRENT_DELETE = (torrent_id: string) => `${API_BASE_URL}/torrents/delete/${torrent_id}`;

// Unrestrict
export const UNRESTRICT_LINK = `${API_BASE_URL}/unrestrict/link`;
