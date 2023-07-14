import { requestUnrestrict } from "../api";

export const useUnrestrict = () => {
  const unRestrictLink = (link: string) => {
    return requestUnrestrict(link);
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
