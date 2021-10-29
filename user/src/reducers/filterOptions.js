
const initialState = {
filter:{}
};

const filterOptions = (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case "SOURCE":
            return {
                ...state,
                filter: {...state.filter,source:payload},
            };
        
            case "TOPIC":
                return {
                    ...state,
                    filter: {...state.filter,topic:payload},
            };
            case "RANGE":
                return {
                    ...state,
                    filter: {...state.filter,range:payload},
            };
            case "SECTOR":
                return {
                    ...state,
                    filter: {...state.filter,sector:payload},
            };
            case "REGION":
                return {
                    ...state,
                    filter: {...state.filter,region:payload},
            };
            case "PESTLE":
                return {
                    ...state,
                    filter: {...state.filter,pestle:payload},
            };
            case "COUNTRY":
                return {
                    ...state,
                    filter: {...state.filter,country:payload},
                };
        default:
            return state;
    }
};

export default filterOptions;
