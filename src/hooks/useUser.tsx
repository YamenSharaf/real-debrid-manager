import { useFetch } from "@raycast/utils";
import { GET_TRAFFIC, GET_USER } from "../api";
import useToken from "./useToken";
import { TrafficData, UserData } from "../schema";

export const useUser = () => {
  const token = useToken();

  const getUserInfo = () => {
    return useFetch<UserData>(GET_USER, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
  };
  const getTrafficInfo = () => {
    return useFetch<TrafficData>(GET_TRAFFIC, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
  };

  return { getUserInfo, getTrafficInfo };
};

export default useUser;
