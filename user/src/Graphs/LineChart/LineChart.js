import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import "./index.css";

const LineChart = () => {
  const d3Chart = useRef();

  useEffect(() => {
    fetch("http://localhost:2000/")
      .then((response) => response.json())
      .then((data) => {

        const filterData = data.filter((d) => {
          return (
            d.sector === "Energy" &&
            d.topic === "gas" &&
            d.pestle === "Industries"
          );
        });

        let countries = [...new Set(filterData.map((each) => each.country))];
        countries = [...countries.filter((c) => c.length !== 0)];
        let likelihoodbyCountry = [];

        countries.map((c, index) => {
          let country = c;
          let count = 0;
          let total = 0;

          filterData.map((each) => {
            if (each.country === country) {
              total += each.likelihood;
              count += 1;
            }
          });
          const average = Math.floor(total / count);
          likelihoodbyCountry.push({ likelihood: average, country: country });
        });

        const margin = { top: 20, right: 30, bottom: 30, left: 30 };
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
            d3.map(likelihoodbyCountry, function (d) {
              return d.country;
            })
        )
          .range([0, width]);
        svg
          .append("g")
          .attr("transform", "translate(0," + height + ")")
          .call(d3.axisBottom(x));

        // Get the max value of counts
        const max = d3.max(likelihoodbyCountry, function (d) {
          return d.likelihood;
        });

        // y axis scale
        const y = d3.scaleLinear().domain([0, max]).range([height, 0]);

        svg.append("g").call(d3.axisLeft(y));

        // Draw line
        svg
          .append("path")
          .datum(likelihoodbyCountry)
          .attr("fill", "none")
          .attr("stroke", "red")
          .attr("stroke-width", 3)
          .attr(
            "d",
            d3
              .line()
              .x(function (d) {
                return x(d.country);
              })
              .y(function (d) {
                return y(d.likelihood);
              })
          );

        // Add title
        svg
          .append("text")
          .attr("x", width / 2)
          .attr("y", margin.top / 5 - 10)
          .attr("text-anchor", "middle")
          .attr("font-size", "16px")
          .attr("fill", "white")
          .text("New York City Film Permits entered in 2020 - Shooting Permit");
      });
  }, []);

  return (
    <div id="d3demo" className="background">
      <svg ref={d3Chart}></svg>
    </div>
  );
};

export default LineChart;
