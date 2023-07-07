import { Action, ActionPanel, Icon, List, Toast, showToast } from "@raycast/api";
import { useTorrents, useUnrestrict } from "./hooks";
import { useState } from "react";
import { formatFileSize, readTorrentDetails } from "./utils";
import { TorrentItemData } from "./schema";

export const Torrents = () => {
  const { getTorrents } = useTorrents();
  const { unRestrictLinks } = useUnrestrict();
  const { data, isLoading } = getTorrents();
  const [showingDetail, setShowingDetail] = useState(false);

  const handleTorrentItemSelect = async (torrent: TorrentItemData) => {
    const links = torrent?.links ?? [];
    await showToast({
      style: Toast.Style.Animated,
      title: "Sending to Downloads",
    });
    const results = await unRestrictLinks(links);
    const hadErrors = results.find(({ status }) => status === "rejected") as {
      status: string;
      reason?: string;
    };
    console.log("xyz hadErrors:", hadErrors);
    if (hadErrors) {
      await showToast({
        style: Toast.Style.Failure,
        title: hadErrors?.reason ?? "Something went wrong",
      });
    } else {
      await showToast({
        style: Toast.Style.Success,
        title: "Sent to Downloads",
      });
    }
  };

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
                    icon={Icon.Forward}
                    title="Send to Downloads"
                    onAction={() => handleTorrentItemSelect(torrent)}
                  />
                  <Action
                    icon={Icon.Info}
                    title="Toggle More Details"
                    onAction={() => setShowingDetail(!showingDetail)}
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
