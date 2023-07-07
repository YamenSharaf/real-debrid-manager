import { Action, ActionPanel, List } from "@raycast/api";
import { useDownloads } from "./hooks";
import { useState } from "react";
import { DownloadFileData } from "./schema";
import { formatDateTime, formatFileSize, formatGenericProperty, parseFileType } from "./utils";

export const Downloads = () => {
  const { getDownloads } = useDownloads();
  const { data, isLoading } = getDownloads();
  const [showingDetail, setShowingDetail] = useState(false);

  const getDownloadDetails = (details: DownloadFileData) => {
    return `
# ${details?.filename}

**Type:** ${formatGenericProperty(details?.mimeType)}

**Size:** ${formatFileSize(details?.filesize)}

**Host:** ${formatGenericProperty(details.host)}

**Download:** ${formatGenericProperty(details.download)}

**Time Added:** ${formatDateTime(details.generated)}

**Quality:** ${formatGenericProperty(details?.type)}
`;
  };

  return (
    <List isLoading={isLoading} isShowingDetail={showingDetail}>
      {data &&
        data.map((download) => {
          const props: Partial<List.Item.Props> = showingDetail
            ? {
                detail: <List.Item.Detail markdown={getDownloadDetails(download)} />,
              }
            : {
                accessories: [
                  { text: formatFileSize(download?.filesize) },
                  {
                    text: parseFileType(download),
                  },
                ],
              };
          return (
            <List.Item
              key={download.id}
              title={download?.filename}
              //   subtitle={`#${download.id}`}
              {...props}
              actions={
                <ActionPanel>
                  <Action title="Toggle More Details" onAction={() => setShowingDetail(!showingDetail)} />
                  <Action.OpenInBrowser url={download?.download} />
                  <Action.CopyToClipboard content={download?.download} title="Copy Download Link" />
                </ActionPanel>
              }
            />
          );
        })}
    </List>
  );
};

export default Downloads;
