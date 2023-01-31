import { useEffect, useState, useRef } from "react";

export const useObserver = () => {
  const [isShow, setIsShow] = useState(false);
  const containerRef: any = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsShow(true);
        } else {
          setIsShow(false);
        }
      });
    });

    observer.observe(containerRef.current);

    return () => {
      observer.disconnect();
    };
  }, []);

  return { containerRef, isShow };
};
