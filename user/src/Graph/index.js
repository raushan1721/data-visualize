import React from "react";
import AreaChart from "../Graphs/AreaChart/index.js";
import BarChart from "../Graphs/BarChart.js";
import LineChart from "../Graphs/LineChart/LineChart";
import PlotChart from "../Graphs/PlotChart/index.js";

function Graph({ selected, axis }) {
  const res = () => {
    switch (selected) {
      case "LineChart":
        return <LineChart axis={axis} />;
      case "BarChart":
        return <BarChart axis={axis} />;
      case "AreaChart":
        return <AreaChart axis={axis} />;
        case "ScatterPlot":
          return <PlotChart axis={axis} />;
      default:
        return "no data found";
    }
  };

  return <>{res()}</>;
}

export default Graph;
