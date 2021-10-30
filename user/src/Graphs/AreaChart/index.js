import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import "./index.css";
import { useSelector } from "react-redux";

function AreaChart({ axis }) {
  const graphData = useSelector((state) => state.graphData.graphData);
  const d3Chart = useRef();

  useEffect(() => {
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
    const svg = d3
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
      .attr("transform", `translate(0,${height})`)
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
    // Add a clipPath: everything out of this area won't be drawn.
    svg
      .append("defs")
      .append("clipPath")
      .attr("id", "clip")
      .append("rect")
      .attr("width", width)
      .attr("height", height)
      .attr("x", 0)
      .attr("y", 0);

    // Add brushing
    const brush = d3
      .brushX() // Add the brush feature using the d3.brush function
      .extent([
        [0, 0],
        [width, height],
      ]); // initialise the brush area: start at 0,0 and finishes at width,height: it means I select the whole graph area

    // Create the area variable: where both the area and the brush take place
    const area = svg.append("g").attr("clip-path", "url(#clip)");

    // Create an area generator
    const areaGenerator = d3
      .area()
      .x((d) => x(d[axis.x]))
      .y0(y(0))
      .y1((d) => y(d[axis.y]));

    // Add the area
    area
      .append("path")
      .datum(graphData)
      .attr("class", "myArea") // I add the class myArea to be able to modify it later on.
      .attr("fill", "blue")
      .attr("fill-opacity", 0.3)
      .attr("stroke", "black")
      .attr("stroke-width", 1)
      .attr("d", areaGenerator);

    // Add the brushing
    area.append("g").attr("class", "brush").call(brush);

    // A function that set idleTimeOut to null
  }, [axis, graphData]);

  return (
    <div id="d3demo" className="background">
      <svg ref={d3Chart}></svg>.
    </div>
  );
}

export default AreaChart;
