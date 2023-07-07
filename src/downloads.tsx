import { Action, ActionPanel, Icon, List } from "@raycast/api";
import { useDownloads } from "./hooks";
import { useState } from "react";
import { formatFileSize, parseFileType, readDownloadDetails } from "./utils";

export const Downloads = () => {
  const { getDownloads } = useDownloads();
  const { data, isLoading } = getDownloads();
  const [showingDetail, setShowingDetail] = useState(false);

  return (
    <List isLoading={isLoading} isShowingDetail={showingDetail}>
      {data &&
        data.map((download) => {
          const props: Partial<List.Item.Props> = showingDetail
            ? {
                detail: <List.Item.Detail markdown={readDownloadDetails(download)} />,
              }
            : {
                accessories: [{ text: formatFileSize(download?.filesize) }],
              };
          return (
            <List.Item
              key={download.id}
              title={download?.filename}
              subtitle={parseFileType(download)}
              {...props}
              actions={
                <ActionPanel>
                  <Action
                    icon={Icon.Info}
                    title="Toggle More Details"
                    onAction={() => setShowingDetail(!showingDetail)}
                  />
                  <Action.OpenInBrowser url={download?.download} />
                  <Action.CopyToClipboard
                    content={download?.download}
                    title="Copy Download Link"
                    shortcut={{
                      key: "c",
                      modifiers: ["cmd"],
                    }}
                  />
                </ActionPanel>
              }
            />
          );
        })}
    </List>
  );
};

export default Downloads;
