import axios from "axios";
export const graphData = (body) => async (dispatch) => {
    const response = await axios.post("http://localhost:2000/graphData", body);
                dispatch({
                    type: "GRAPH_DATA",
                    payload: response.data,
                });
        return response.data;
};

