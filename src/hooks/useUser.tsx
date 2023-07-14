import { useFetch } from "@raycast/utils";
import { TRAFFIC_GET, USER_GET } from "../api";
import useToken from "./useToken";
import { TrafficData, UserData } from "../schema";

export const useUser = () => {
  const token = useToken();

  const getUserInfo = () => {
    return useFetch<UserData>(USER_GET, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
  };
  const getTrafficInfo = () => {
    return useFetch<TrafficData>(TRAFFIC_GET, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
  };

  return { getUserInfo, getTrafficInfo };
};

export default useUser;
