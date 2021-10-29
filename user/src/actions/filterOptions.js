import axios from "axios";
export const source = () => async (dispatch) => {
        const response = await axios("http://localhost:2000/source")
                dispatch({
                    type: "SOURCE",
                    payload: response.data,
                });
        return response.data;
};

export const topic = () => async (dispatch) => {
    const response = await axios("http://localhost:2000/topic")
            dispatch({
                type: "TOPIC",
                payload: response.data,
            });
    return response.data;
};

export const range = () => async (dispatch) => {
    const response = await axios("http://localhost:2000/endDateRange")
            dispatch({
                type: "RANGE",
                payload: response.data,
            });
    return response.data;
};

export const sector = () => async (dispatch) => {
    const response = await axios("http://localhost:2000/sector")
            dispatch({
                type: "SECTOR",
                payload: response.data,
            });
    return response.data;
};

export const region = () => async (dispatch) => {
    const response = await axios("http://localhost:2000/region")
            dispatch({
                type: "REGION",
                payload: response.data,
            });
    return response.data;
};

export const pestle = () => async (dispatch) => {
    const response = await axios("http://localhost:2000/pestle")
            dispatch({
                type: "PESTLE",
                payload: response.data,
            });
    return response.data;
};

export const country = () => async (dispatch) => {
    const response = await axios("http://localhost:2000/country")
            dispatch({
                type: "COUNTRY",
                payload: response.data,
            });
    return response.data;
};