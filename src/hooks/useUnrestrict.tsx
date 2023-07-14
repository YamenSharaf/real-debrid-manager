import { requestUnrestrict } from "../api";
import useToken from "./useToken";

export const useUnrestrict = () => {
  const token = useToken();

  const unRestrictLink = (link: string) => {
    return requestUnrestrict(link, token);
  };

  const unRestrictLinks = async (links: string[]) => {
    const results = await Promise.allSettled(links.map((link) => unRestrictLink(link)));
    return results;
  };

  return {
    unRestrictLink,
    unRestrictLinks,
  };
};

export default useUnrestrict;
