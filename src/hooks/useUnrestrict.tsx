import { requestLinkUnrestrict } from "../api";

export const useUnrestrict = () => {
  const unRestrictLinks = async (links: string[]) => {
    const results = await Promise.allSettled(links.map((link) => requestLinkUnrestrict(link)));
    return results;
  };

  return {
    unRestrictLinks,
  };
};

export default useUnrestrict;
