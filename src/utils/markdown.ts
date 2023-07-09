import {
  TORRENT_STATUS_MAP,
  formatDateTime,
  formatFileSize,
  formatGenericProperty,
  formatProgress,
  isExternalHost,
  isTorrentCompleted,
  isTorrentPendingFileSelection,
} from ".";
import { DownloadFileData, TorrentItemData, UserData } from "../schema";

export const readUserDetails = (details: UserData) => {
  return `
# ${details?.username}
    
![](${details?.avatar})
`;
};

export const readTorrentDetails = (details: TorrentItemData) => {
  return `
# ${details?.filename}

**Progress:** ${formatGenericProperty(formatProgress(details?.progress))}

**Size:** ${formatFileSize(details?.bytes)}

**Host:** ${formatGenericProperty(details.host)}

**Time Added:** ${formatDateTime(details.added)}

**Status:** ${TORRENT_STATUS_MAP[details?.status].title}

${isTorrentCompleted(details.status) ? `💡 To download the file(s), move torrent to downloads first.` : ""}

${
  isTorrentPendingFileSelection(details.status)
    ? `💡 Files must be selected and downloaded before moved to downloads`
    : ""
}
`;
};

export const readDownloadDetails = (details: DownloadFileData) => {
  return `
# ${details?.filename}

**Type:** ${formatGenericProperty(details?.mimeType)}

**Size:** ${formatFileSize(details?.filesize)}

**Download:** ${formatGenericProperty(details.download)}

**Host:** ${formatGenericProperty(details.host)}

**Original Link:** ${isExternalHost(details) ? details?.link : formatGenericProperty("")}

**Time Added:** ${formatDateTime(details.generated)}

**Quality:** ${formatGenericProperty(details?.type)}
`;
};
