import { Action, ActionPanel, Icon, List, Toast, showToast } from "@raycast/api";
import { useDownloads } from "./hooks";
import { useState } from "react";
import { formatFileSize, isExternalHost, parseFileType, readDownloadDetails } from "./utils";
import { DownloadFileData } from "./schema";

export const Downloads = () => {
  const { getDownloads, deleteDownload } = useDownloads();
  const { data, isLoading, revalidate } = getDownloads();
  const [showingDetail, setShowingDetail] = useState(false);

  const handleDownloadDelete = async ({ id }: DownloadFileData) => {
    await showToast({
      style: Toast.Style.Animated,
      title: "Deleting download...",
    });
    try {
      await deleteDownload(id);
      revalidate();
      await showToast({
        style: Toast.Style.Success,
        title: "Download deleted",
      });
    } catch (e) {
      await showToast({
        style: Toast.Style.Failure,
        title: "Failed to delete download",
      });
    }
  };

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
                  {isExternalHost(download) && (
                    <Action.CopyToClipboard
                      content={download?.link}
                      title="Copy Original Link"
                      shortcut={{
                        key: "c",
                        modifiers: ["cmd", "opt"],
                      }}
                    />
                  )}

                  <Action
                    shortcut={{
                      key: "backspace",
                      modifiers: ["cmd"],
                    }}
                    icon={Icon.Trash}
                    title="Delete Download"
                    onAction={() => handleDownloadDelete(download)}
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
