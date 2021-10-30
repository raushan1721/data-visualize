import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import { useSelector } from "react-redux";

function PlotChart({ axis }) {
  const graphData = useSelector((state) => state.graphData.graphData);
  const d3Chart = useRef();

  useEffect(() => {
    // set the dimensions and margins of the graph
    const margin = { top: 30, right: 30, bottom: 60, left: 45 };
    const width =
      parseInt(d3.select("#d3demo").style("width")) -
      margin.left -
      margin.right;
    const height =
      parseInt(d3.select("#d3demo").style("height")) -
      margin.top -
      margin.bottom;

    // append the svg object to the body of the page
    var svg = d3
      .select(d3Chart.current)
 
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // Add X axis
    const x = d3
      .scaleBand()
      .domain(
        d3.map(graphData, function (d) {
          return d[axis.x];
        })
      )
      .range([0, width]);

    svg
      .append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));

    svg
      .append("text")
      .attr(
        "transform",
        "translate(" + width / 2 + " ," + (height + margin.top + 20) + ")"
      )
      .style("text-anchor", "middle")
      .text(axis.x);
    // Get the max value of counts
    const max = d3.max(graphData, function (d) {
      return d[axis.y];
    });
    // Add Y axis
    const y = d3.scaleLinear().domain([0, max]).range([height, 0]);

    svg.append("g").call(d3.axisLeft(y));

    svg
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left)
      .attr("x", 0 - height / 2)
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .text(axis.y);
    // Add dots
    svg
      .append("g")
      .selectAll("dot")
      .data(graphData)
      .enter()
      .append("circle")
      .attr("cx", function (d) {
        return x(d[axis.x]);
      })
      .attr("cy", function (d) {
        return y(d[axis.y]);
      })
      .attr("r", 5.5)
      .style("fill", "red");
  }, [axis, graphData]);
    
  return (
    <div id="d3demo" className="background">
      <svg ref={d3Chart}></svg>
    </div>
  );
}

export default PlotChart;
