import { useRef } from "react";
import { useDimensions } from "../utils/useDimensions";
import Scatterplot from "./Scatterplot";

// Measures the space available, then draws a Scatterplot that exactly fits it.
function ResponsiveScatterplot({ data, selectedType }) {
  const chartRef = useRef(null); // a handle on the <div> below, so we can measure it
  const { width } = useDimensions(chartRef);

  // Wide screens get a wide-ish chart; phones get a taller shape so dots aren't squashed
  const height = Math.round(Math.min(480, Math.max(320, width * 0.65)));

  return (
    <div ref={chartRef} style={{ width: "100%" }}>
      {width > 0 && <Scatterplot data={data} width={width} height={height} selectedType={selectedType} />}
    </div>
  );
}

export default ResponsiveScatterplot;
