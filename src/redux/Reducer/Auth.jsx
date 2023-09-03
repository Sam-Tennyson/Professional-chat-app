import { SET_CHAT_ID, SET_USER_DATA, START_LOADER, STOP_LOADER, UPDATED_TOKEN } from "../Actions/ActionTypes"

const initial = {
    user_data: null,
    token: null,
    sender_id: null,
    receiver_id: null,
    chat_id: null,
    loader: false,
}

const Auth = (state={...initial}, action)=> {
    switch(action.type) {
        case START_LOADER:
            return {
                ...state,
                loader: true,
            }
        case STOP_LOADER:
            return {
                ...state,
                loader: false,
            }
        case SET_USER_DATA:
            console.log(action.payload);
            return {
                ...state, 
                user_data: action?.payload,
                sender_id: action?.payload?.uid,
            }
        case UPDATED_TOKEN:
            return {
                ...state,
                token: action.payload
            }
        case SET_CHAT_ID:
            return {
                ...state,
                receiver_id: action?.payload?.receiver_id,
                chat_id: action?.payload?.chat_id,
                chat_ID: state.user_data.uid > action.payload.receiver_id
                ? state.user_data.uid + action.payload.receiver_id
                : action.payload.receiver_id + state.user_data.uid,
            }
        default:
            return state
    }
}
export default Auth