import { useReducer } from "react";
import { Action, ActionPanel, Icon, List } from "@raycast/api";
import { TorrentFile, TorrentItemDataExtended } from "../schema";
import { formatFileSize } from "../utils";
import { reducer as fileSelectionReducer } from "../reducers";

type TorrentFileSelectionProps = {
  torrentItemData: TorrentItemDataExtended;
};

export const TorrentFileSelection: React.FC<TorrentFileSelectionProps> = ({ torrentItemData }) => {
  const [torrentFiles, dispatch] = useReducer(fileSelectionReducer, torrentItemData?.files as TorrentFile[]);

  const handleFileSelection = (id: number) => {
    dispatch({ type: "toggle", id });
  };
  const handleSelectAll = () => {
    dispatch({ type: "select_all" });
  };
  const handleDeselectAll = () => {
    dispatch({ type: "deselect_all" });
  };

  const handleSubmit = () => {
    const selectedFiles = torrentFiles.filter((file) => file.selected);
    const files = selectedFiles.map((file) => file.id).join(",");
    console.log("xyz files", files);
  };

  return (
    <List>
      {torrentFiles.map((torrentFile) => (
        <List.Item
          icon={torrentFile.selected ? Icon.Checkmark : Icon.Circle}
          key={torrentFile.id}
          title={torrentFile.path.slice(1)}
          accessories={[
            {
              text: formatFileSize(torrentFile.bytes),
            },
          ]}
          actions={
            <ActionPanel>
              <Action
                icon={torrentFile.selected ? Icon.Circle : Icon.Checkmark}
                title={torrentFile.selected ? "Deselect" : "Select"}
                onAction={() => handleFileSelection(torrentFile.id)}
              />
              <Action icon={Icon.ArrowRightCircleFilled} title="Submit" onAction={handleSubmit} />
              <Action
                icon={Icon.ArrowRightCircleFilled}
                shortcut={{
                  key: "a",
                  modifiers: ["cmd", "ctrl"],
                }}
                title={torrentFiles.some((file) => file.selected) ? "Deselect All" : "Select All"}
                onAction={torrentFiles.some((file) => file.selected) ? handleDeselectAll : handleSelectAll}
              />
            </ActionPanel>
          }
        />
      ))}
    </List>
  );
};

export default TorrentFileSelection;
