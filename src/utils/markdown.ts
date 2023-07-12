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
import {
  DownloadFileData,
  TorrentItemData,
  TorrentItemDataExtended,
  TrafficData,
  TrafficReset,
  TrafficType,
  UserData,
} from "../schema";

export const readTrafficInfo = (trafficInfo?: TrafficData) => {
  if (!trafficInfo) return "";

  let markdownTable = `
# Traffic Information


| Domain | Remaining | Limit |
|--------|------|-------|
`;

  for (const domain in trafficInfo) {
    const info = trafficInfo[domain];
    const leftText = info.type === "links" ? `${info.left} Links` : formatFileSize(info.left);
    const limitText =
      info.limit && info.reset ? `${info.limit} ${TrafficType[info.type]} / ${TrafficReset[info.reset]}` : "-";

    markdownTable += `| ${domain === "remote" ? "Remote" : domain} | ${leftText} | ${limitText} |\n`;
  }

  return markdownTable;
};

export const readUserDetails = (userInfo: UserData, trafficInfo?: TrafficData) => {
  return `
## User: ${userInfo?.username}
    
![](${userInfo?.avatar})

${readTrafficInfo(trafficInfo)}
`;
};

const readTorrentFilesData = (details: TorrentItemDataExtended): string => {
  if (!details?.files?.length ?? null) return "";

  return details.files.reduce((acc, file) => {
    return acc + `- [${file.selected ? "x" : " "}] \`${file.path}\`  \`${formatFileSize(file.bytes)}\`\n`;
  }, `## Torrent Files \n`);
};

export const readTorrentDetails = (details: TorrentItemData | TorrentItemDataExtended) => {
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

${readTorrentFilesData(details as TorrentItemDataExtended) || ``}
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
