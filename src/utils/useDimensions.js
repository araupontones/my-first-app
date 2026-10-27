import { useLayoutEffect, useState } from "react";

// Returns the current { width, height } of the element in targetRef,
// and updates whenever that element is resized (window resize, phone rotation...).
export const useDimensions = (targetRef) => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  // useLayoutEffect runs after React puts the div on the page, before the browser paints
  useLayoutEffect(() => {
    if (!targetRef.current) return;

    const observer = new ResizeObserver(([entry]) => {
      setDimensions({
        width: entry.contentRect.width,
        height: entry.contentRect.height,
      });
    });
    observer.observe(targetRef.current);

    return () => observer.disconnect(); // clean up when the component disappears
  }, [targetRef]);

  return dimensions;
};
