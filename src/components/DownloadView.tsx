import { ActionPanel, Detail } from "@raycast/api";
import { DownloadFileData } from "../schema";
import { readDownloadDetails } from "../utils";
import { DownloadActions } from ".";
import { useDownloads } from "../hooks";

interface DownloadViewProps {
  downloadItem: DownloadFileData;
  revalidate: () => void;
}

export const DownloadView: React.FC<DownloadViewProps> = ({ downloadItem, revalidate }) => {
  const { getStreamingInfo } = useDownloads();
  const { data, error } = getStreamingInfo(downloadItem.id);
  console.log("xyz data:", data);
  console.log("xyz error:", error);
  return (
    <Detail
      markdown={readDownloadDetails(downloadItem)}
      actions={
        <ActionPanel>
          <DownloadActions downloadItem={downloadItem} revalidate={revalidate} popOnSuccess />
        </ActionPanel>
      }
    />
  );
};

export default DownloadView;
