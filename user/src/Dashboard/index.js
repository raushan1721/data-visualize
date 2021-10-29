import React, { useEffect, useState } from "react";
import LineChart from "../Graphs/LineChart/LineChart";
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
import axios from "axios";
import { graphData } from "../actions/graphData";
// import * as d3 from "d3";
const options = [
  {
    img: "https://datavizproject.com/wp-content/uploads/2015/10/1-Line-Chart.png",
    title: "Line Chart",
  },
  {
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWTKEB4YGMU_WcjJ6QuasVBxhyHPewzix6xw&usqp=CAU",
    title: "Bar Chart",
  },
  {
    img: "https://datavizproject.com/wp-content/uploads/2015/10/1-Line-Chart.png",
    title: " Bar Chart",
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
  const [selected, setSelected] = useState("");
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
    e.preventDefault();
    let temp = {};
    temp.filter = filterOptions;
    let co = {};
    let a = [];
    a.push(axis.x);
    a.push(axis.y);
    a.map((each) => {
      coordinates.map((c) => {
        if (c.name === each) co[c.label] = each;
      });
    });
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
                      {coordinates?.map((d, index) => (
                        <option value={d.name} key={index}>
                          {d.name}
                        </option>
                      ))}
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
                        <option value={d.name} key={index}>
                          {d.name}
                        </option>
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
            <LineChart />
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
