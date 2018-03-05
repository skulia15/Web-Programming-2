import { GET_CUSTOMER, CREATE_CUSTOMER } from '../constants/customerConstants';

const customerReducer = (state = [], action) => {
    switch (action.type) {
        case GET_CUSTOMER:
            return action.payload
        case CREATE_CUSTOMER:
            console.log(action.payload);
            return action.payload
        default:
            return state;
    }
};

export default customerReducer;