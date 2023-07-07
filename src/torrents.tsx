import { Action, ActionPanel, Icon, List } from "@raycast/api";
import { useTorrents } from "./hooks";
import { useState } from "react";
import { formatFileSize, readTorrentDetails } from "./utils";

export const Torrents = () => {
  const { getTorrents } = useTorrents();
  const { data, isLoading } = getTorrents();
  const [showingDetail, setShowingDetail] = useState(false);

  return (
    <List isLoading={isLoading} isShowingDetail={showingDetail}>
      {data &&
        data.map((torrent) => {
          const props: Partial<List.Item.Props> = showingDetail
            ? {
                detail: <List.Item.Detail markdown={readTorrentDetails(torrent)} />,
              }
            : {
                accessories: [{ text: formatFileSize(torrent?.bytes) }],
              };
          return (
            <List.Item
              key={torrent.id}
              title={torrent?.filename}
              subtitle={String(torrent.progress)}
              {...props}
              actions={
                <ActionPanel>
                  <Action
                    icon={Icon.BlankDocument}
                    title="Toggle More Details"
                    onAction={() => setShowingDetail(!showingDetail)}
                  />
                  <Action.OpenInBrowser url={torrent?.status} />
                  <Action.CopyToClipboard
                    content={torrent?.status}
                    title="Copy Torrent Link"
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

export default Torrents;
