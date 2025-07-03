import { useEffect, useState } from "react";

const useMediaQuery = (query) => {
  const [isMatch, setIsMatch] = useState(window.matchMedia(query).matches);

  useEffect(() => {
    const media = window.matchMedia(query);

    const handleChange = () => setIsMatch(media.matches);

    media.addEventListener("change", handleChange);

    return () => media.removeEventListener("change", handleChange);
  }, [query]);

  return isMatch;
};

export default useMediaQuery;
