import axios from "axios";
import { API_BASE_URL } from "./endpoints";
import { getPreferenceValues } from "@raycast/api";

const { api_token } = getPreferenceValues<Preferences>();

export const fetchAxios = axios.create({
  baseURL: `${API_BASE_URL}/`,
  headers: { authorization: `Bearer ${api_token}` },
});

export default fetchAxios;
