import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { useSelector } from "react-redux";

function BarChart({ axis }) {
  const graphData = useSelector((state) => state.graphData.graphData);
  const d3Chart = useRef();
  // Ref for updating dimention
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  // Ref for resize event update
  const update = useRef(false);

  useEffect(() => {
    window.addEventListener("resize", () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });

      if (update.current) {
        d3.selectAll("g").remove();
      } else {
        update.current = true;
      }
    });

    DrawChart(graphData, axis, dimensions);
  }, [dimensions, graphData, axis]);

  const margin = { top: 50, right: 30, bottom: 30, left: 60 };

  function DrawChart(data, axis, dimensions) {
    // console.log(dimensions.width, dimensions.height)

    const chartwidth =
      parseInt(d3.select("#d3demo").style("width")) -
      margin.left -
      margin.right;
    const chartheight =
      parseInt(d3.select("#d3demo").style("height")) -
      margin.top -
      margin.bottom;

    const svg = d3
      .select(d3Chart.current)
      .attr("width", chartwidth + margin.left + margin.right)
      .attr("height", chartheight + margin.top + margin.bottom);

    // x scale
    const x = d3
      .scaleBand()
      .domain(d3.range(data.length))
      .range([margin.left, chartwidth - margin.right])
      .padding(0.1);

    svg
      .append("g")
      .attr("transform", "translate(0," + chartheight + ")")
      .call(
        d3
          .axisBottom(x)
          .tickFormat((i) => data[i][axis.x])
          .tickSizeOuter(0)
      );

      svg.append("text")             
      .attr("transform",
            "translate(" + (chartwidth/2) + " ," + 
                           (chartheight + margin.top + 20) + ")")
        .style("text-anchor", "middle")
        .attr("y", margin.left - 80)

      .text(axis.x);
    
    const max = d3.max(data, function (d) {
      return d[axis.y];
    });

    // y scale
    const y = d3
      .scaleLinear()
      .domain([0, max])
      .range([chartheight, margin.top]);

    svg
      .append("g")
      .attr("transform", "translate(" + margin.left + ",0)")
      .call(d3.axisLeft(y));

      svg.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", margin.left - 50)
      .attr("x",0 - (chartheight / 2))
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .text(axis.y);      

    // Draw bars
    svg
      .append("g")
      .attr("fill", "red")
      .selectAll("rect")
      .data(data)
      .join("rect")
      .attr("x", (d, i) => x(i))
      .attr("y", (d) => y(d[axis.y]))
      .attr("height", (d) => y(0) - y(d[axis.y]))
      .attr("width", x.bandwidth());
  }

  return (
    <div id="d3demo" className="background">
      <svg ref={d3Chart}></svg>
    </div>
  );
}

export default BarChart;
