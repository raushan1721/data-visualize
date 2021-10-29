import axios from "axios";
export const graphData = (body) => async (dispatch) => {
    console.log(body);
    const response = await axios.post("http://localhost:2000/graphData", body);
    console.log(response.data);
                dispatch({
                    type: "GRAPH_DATA",
                    payload: response.data,
                });
        return response.data;
};

