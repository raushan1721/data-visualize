import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import "./index.css";
import { useSelector } from "react-redux";

const LineChart = ({axis}) => {
  const graphData = useSelector(state => state.graphData.graphData);
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

        // Set up chart
        const svg = d3
          .select(d3Chart.current)
          .attr("width", width + margin.left + margin.right)
          .attr("height", height + margin.top + margin.bottom)
          .append("g")
          .attr(
            "transform",
            "translate(" + margin.left + "," + margin.top + ")"
          );

        // x axis scale

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
    
          svg.append("text")             
          .attr("transform",
                "translate(" + (width/2) + " ," + 
                               (height + margin.top + 20) + ")")
          .style("text-anchor", "middle")
          .text(axis.x);
        // Get the max value of counts
        const max = d3.max(graphData, function (d) {
          return d[axis.y];
        });

        // y axis scale
        const y = d3.scaleLinear().domain([0, max]).range([height, 0]);

        svg.append("g").call(d3.axisLeft(y));
        svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left)
        .attr("x",0 - (height / 2))
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .text(axis.y);    
        // Draw line
        svg
          .append("path")
          .datum(graphData)
          .attr("fill", "none")
          .attr("stroke", "red")
          .attr("stroke-width", 3)
          .attr(
            "d",
            d3
              .line()
              .x(function (d) {
                return x(d[axis.x]);
              })
              .y(function (d) {
                return y(d[axis.y]);
              })
    );
    
  
    
  
  }, [axis,graphData]);

  return (
    <div id="d3demo" className="background">
      <svg ref={d3Chart}></svg>
    </div>
  );
};

export default LineChart;
