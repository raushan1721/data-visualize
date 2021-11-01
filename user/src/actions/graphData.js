import axios from "axios";
export const graphData = (body) => async (dispatch) => {
  const response = await axios.post(
    "https://visualise1721.herokuapp.com/graphData",
    body
  );
  dispatch({
    type: "GRAPH_DATA",
    payload: response.data,
  });
  return response.data;
};
