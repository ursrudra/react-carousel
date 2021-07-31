import { useEffect, useState } from "react";

function useMedia(query: string): boolean {
  const [isMatch, setIsMatch] = useState<boolean>(false);

  useEffect(() => {
    const mediaQueryList = window.matchMedia(query);

    function handleOrientationChange(mql: { matches: boolean }) {
      setIsMatch(mql.matches);
    }

    handleOrientationChange(mediaQueryList);

    mediaQueryList.addEventListener("change", handleOrientationChange);

    return () => {
      mediaQueryList.removeEventListener("change", handleOrientationChange);
    };
  }, [query]);
  return isMatch;
}

export default useMedia;
