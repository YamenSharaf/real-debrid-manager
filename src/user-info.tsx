import { Detail } from "@raycast/api";
import { useUser } from "./hooks";

export const UserInfo = () => {
  const { getUserInfo } = useUser();
  const { data: userInfo, isLoading } = getUserInfo();
  const isPremium = userInfo?.type === "premium" && userInfo.premium !== 0;
  const getExpiryDate = () => {
    if (!userInfo?.expiration) {
      return "";
    }
    const dateObj = new Date(userInfo?.expiration);
    const formattedDate = Intl.DateTimeFormat("en-US").format(dateObj);
    return formattedDate;
  };

  const markdown = `
# ${userInfo?.username}

![](${userInfo?.avatar})
`;
  return (
    <Detail
      isLoading={isLoading}
      markdown={markdown}
      metadata={
        <Detail.Metadata>
          <Detail.Metadata.Label title="email" text={userInfo?.email} />
          <Detail.Metadata.Label title="Premium Status" text={isPremium ? "Yes" : "No"} />
          <Detail.Metadata.Label title="Premium Expiration Date" text={getExpiryDate()} />
          <Detail.Metadata.Label title="Points" text={userInfo?.points?.toString()} />
        </Detail.Metadata>
      }
    />
  );
};

export default UserInfo;
