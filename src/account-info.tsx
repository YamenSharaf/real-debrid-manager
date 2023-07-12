import { Color, Detail } from "@raycast/api";
import { useUser } from "./hooks";
import { formatDateTime, getPremiumDaysRemaining, readTrafficInfo } from "./utils";

export const UserInfo = () => {
  const { getUserInfo, getTrafficInfo } = useUser();
  const { data: userInfo, isLoading } = getUserInfo();
  const { data: trafficInfo } = getTrafficInfo();
  const isPremium = userInfo?.type === "premium" && userInfo.premium !== 0;
  const remainingPoints = userInfo?.points?.toString() ?? "";
  const premiumRemainingDays = getPremiumDaysRemaining(userInfo?.expiration);

  return (
    <Detail
      isLoading={isLoading}
      markdown={userInfo ? readTrafficInfo(trafficInfo) : ""}
      metadata={
        <Detail.Metadata>
          <Detail.Metadata.Label title="Username" text={userInfo?.username} />
          <Detail.Metadata.Separator />
          <Detail.Metadata.Label title="Email" text={userInfo?.email} />
          <Detail.Metadata.Separator />
          <Detail.Metadata.TagList title="Premium Status">
            <Detail.Metadata.TagList.Item
              text={isPremium ? "Premium" : "Free"}
              color={isPremium ? Color.Green : Color.Red}
            />
          </Detail.Metadata.TagList>
          <Detail.Metadata.Label title="Premium Expiration Date" text={formatDateTime(userInfo?.expiration, "date")} />
          {premiumRemainingDays && (
            <Detail.Metadata.TagList title="Days Remaining">
              <Detail.Metadata.TagList.Item
                text={premiumRemainingDays.toString()}
                color={premiumRemainingDays > 30 ? Color.Green : Color.Red}
              />
            </Detail.Metadata.TagList>
          )}
          <Detail.Metadata.Separator />
          <Detail.Metadata.TagList title="Points">
            <Detail.Metadata.TagList.Item
              text={remainingPoints || "0"}
              color={remainingPoints ? Color.Green : Color.PrimaryText}
            />
          </Detail.Metadata.TagList>
        </Detail.Metadata>
      }
    />
  );
};

export default UserInfo;
