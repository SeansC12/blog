import { useState, useEffect } from "react";

function useScroll() {
  const [isVisible, setIsVisible] = useState(true);
  const [lastYPosition, setLastYPosition] = useState(0);

  const handleScroll = () => {
    if (typeof window === "undefined") return;

    const currentScrollYPosition = window.scrollY;
    if (
      lastYPosition < currentScrollYPosition &&
      currentScrollYPosition - lastYPosition > 50
    ) {
      setIsVisible(false);
      setLastYPosition(currentScrollYPosition);
    } else if (
      lastYPosition > currentScrollYPosition &&
      lastYPosition - currentScrollYPosition > 50
    ) {
      setIsVisible(true);
      setLastYPosition(currentScrollYPosition);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", handleScroll);
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastYPosition]);
  return isVisible;
}

export default useScroll;
