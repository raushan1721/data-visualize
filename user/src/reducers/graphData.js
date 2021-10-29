
const initialState = {
    graphData:[]
    };
    
    const graphData = (state = initialState, action) => {
        const { type, payload } = action;
    
        switch (type) {
            case "GRAPH_DATA":
                return {
                    ...state,
                    graphData: payload,
                };
            
            default:
                return state;
        }
    };
    
    export default graphData;
    