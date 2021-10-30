import React, { useEffect, useState } from "react";

import styles from "./index.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  country,
  pestle,
  range,
  region,
  sector,
  source,
  topic,
} from "../actions/filterOptions";

import { graphData } from "../actions/graphData";
import Graph from "../Graph";
// import * as d3 from "d3";
const options = [
  {
    img: "https://datavizproject.com/wp-content/uploads/2015/10/1-Line-Chart.png",
    title: "LineChart",
  },
  {
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWTKEB4YGMU_WcjJ6QuasVBxhyHPewzix6xw&usqp=CAU",
    title: "BarChart",
  },
  {
    img: "data:image/png;base64,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",
    title: "AreaChart",
  },
  {
    img: "https://www.mathsisfun.com/data/images/mean-sea-level.gif",
    title: "ScatterPlot",
  },
];

const coordinates = [
  {
    name: "country",
    label: "key",
  },
  {
    name: "city",
    label: "key",
  },
  {
    name: "region",
    label: "key",
  },
  {
    name: "topic",
    label: "key",
  },
  {
    name: "intensity",
    label: "value",
  },
  {
    name: "relevance",
    label: "value",
  },
  {
    name: "likelihood",
    label: "value",
  },
];

function Dashboard() {
  const dispatch = useDispatch();
  const [selected, setSelected] = useState("LineChart");
  const filter = useSelector((state) => state.filterOptions.filter);

  useEffect(() => {
    const fetch = async () => {
      await dispatch(source());
      await dispatch(topic());
      await dispatch(range());
      await dispatch(sector());
      await dispatch(region());
      await dispatch(pestle());
      await dispatch(country());
    };
    fetch();
  }, []);

  const [filterOptions, setFilterOptions] = useState({
    source: "",
    end_year: null,
    topic: "",
    sector: "",
    region: "",
    pestle: "",
    country: "",
  });

  const [axis, setAxis] = useState({
    x: null,
    y: null,
  });

  const onChangeFilter = (e) =>
    setFilterOptions({ ...filterOptions, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    // e.preventDefault();
    let temp = {};
    temp.filter = filterOptions;
    let co = {};
    let a = [];
    a.push(axis.x);
    a.push(axis.y);
    a.map((each) =>
      coordinates.map((c) => {
        if (c.name === each) co[c.label] = each;
      })
    );
    temp.coordinates = co;
    await dispatch(graphData(temp));
  };

  return (
    <div className={styles.dashboard}>
      <div className="row row-lg-column g-0" style={{ height: "75vh" }}>
        <div
          className={`${styles.smallerDiv} col-lg-3 col-12 order-lg-1 order-2`}
        >
          <div
            className="d-flex flex-lg-column"
            style={{ height: "100%", gap: "10px" }}
          >
            <div className={`${styles.graphOptions}  order-lg-2 order-2`}>
              <div
                className={styles.background}
                style={{ height: "100%", width: "100%", padding: "10px" }}
              >
                <p style={{ fontSize: "18px" }}>Choose graph style</p>
                <div className={styles.graphOptions}>
                  {options.map((o, index) => (
                    <span
                      className={selected === o.title ? styles.border : null}
                      onClick={() => setSelected(o.title)}
                      key={index}
                    >
                      <img src={o.img} alt="" />
                      <p>{o.title}</p>
                    </span>
                  ))}
                </div>
                <button
                  className={styles.filterBtn}
                  style={{ width: "130px" }}
                  onClick={(e) => handleSubmit(e)}
                >
                  Draw Graph
                </button>
              </div>
            </div>
            <div
              className={`${styles.variables}  ${styles.background} order-lg-1 order-1`}
            >
              <div
                className="row row-cols-1 g-0 p-2"
                style={{ height: "100%" }}
              >
                <div className="col ">
                  <div className={styles.filter}>
                    <p>x- coordinates</p>
                    <select
                      required="true"
                      className="form-select"
                      aria-label="Default select example"
                      onChange={(e) => setAxis({ ...axis, x: e.target.value })}
                    >
                      <option selected value={null}>
                        Open this select menu
                      </option>
                      {coordinates?.map((d, index) =>
                        d.label === "key" ? (
                          <option value={d.name} key={index}>
                            {d.name}
                          </option>
                        ) : null
                      )}
                    </select>
                  </div>
                </div>
                <div className="col ">
                  <div className={`${styles.filter} `}>
                    <p>Y- coordinates</p>
                    <select
                      required="true"
                      className="form-select"
                      aria-label="Default select example"
                      onChange={(e) => setAxis({ ...axis, y: e.target.value })}
                    >
                      <option selected value={null}>
                        Open this select menu
                      </option>
                      {coordinates?.map((d, index) => (
                        d.label === "value" ? (
                          <option value={d.name} key={index}>
                            {d.name}
                          </option>
                        ) : null
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className={`${styles.biggerDiv} col-lg-9 col-12 order-lg-2 order-1`}
        >
          <div className={`${styles.graph} `}>
            <Graph selected={selected} axis={axis} />
            {/* <BarChart axis={axis}/> */}
          </div>
        </div>
      </div>
      <div
        className="row g-0"
        style={{ minHeight: "25vh", padding: "10px 0px" }}
      >
        <div className={`${styles.filterOptions} ${styles.background}`}>
          <div className="row row-cols-1 row-cols-lg-4 row-cols-md-3 row-cols-sm-2 w-100 g-0">
            <div className="col p-2">
              <div className={styles.filter}>
                <p>source</p>
                <select
                  name="source"
                  required="true"
                  className="form-select"
                  aria-label="Default select example"
                  onChange={(e) => onChangeFilter(e)}
                >
                  <option selected value={null}>
                    Open this select menu
                  </option>
                  {filter.source?.map((d, index) => (
                    <option value={d} key={index}>
                      {d}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="col p-2">
              <div className={styles.filter}>
                <p>
                  End Year <span>(</span>
                  {filter.range?.min} - {filter.range?.max}
                  <span>)</span>
                </p>
                <input
                  style={{ width: "100%" }}
                  placeholder="YYYY"
                  type="Number"
                  name="end_year"
                  onChange={(e) =>
                    setFilterOptions({
                      ...filterOptions,
                      [e.target.name]: e.target.value,
                    })
                  }
                />
              </div>
            </div>
            <div className="col p-2">
              <div className={styles.filter}>
                <p>topic</p>
                <select
                  name="topic"
                  required="true"
                  className="form-select"
                  aria-label="Default select example"
                  onChange={(e) => onChangeFilter(e)}
                >
                  <option selected value={null}>
                    Open this select menu
                  </option>
                  {filter.topic?.map((d, index) => (
                    <option value={d} key={index}>
                      {d}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="col p-2">
              <div className={styles.filter}>
                <p>sector</p>
                <select
                  name="sector"
                  required="true"
                  className="form-select"
                  aria-label="Default select example"
                  onChange={(e) => onChangeFilter(e)}
                >
                  <option selected value={null}>
                    Open this select menu
                  </option>
                  {filter.sector?.map((d, index) => (
                    <option value={d} key={index}>
                      {d}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="col p-2">
              <div className={styles.filter}>
                <p>region</p>
                <select
                  name="region"
                  required="true"
                  className="form-select"
                  aria-label="Default select example"
                  onChange={(e) => onChangeFilter(e)}
                >
                  <option selected value={null}>
                    Open this select menu
                  </option>
                  {filter.source?.map((d, index) => (
                    <option value={d} key={index}>
                      {d}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="col p-2">
              <div className={styles.filter}>
                <p>pestle</p>
                <select
                  name="pestle"
                  required="true"
                  className="form-select"
                  aria-label="Default select example"
                  onChange={(e) => onChangeFilter(e)}
                >
                  <option selected value={null}>
                    Open this select menu
                  </option>
                  {filter.pestle?.map((d, index) => (
                    <option value={d} key={index}>
                      {d}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="col p-2">
              <div className={styles.filter}>
                <p>country</p>
                <select
                  name="country"
                  required="true"
                  className="form-select"
                  aria-label="Default select example"
                  onChange={(e) => onChangeFilter(e)}
                >
                  <option selected value={null}>
                    Open this select menu
                  </option>
                  {filter.country?.map((d, index) => (
                    <option value={d} key={index}>
                      {d}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
