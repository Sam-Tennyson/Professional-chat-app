import { SET_CHAT_ID, SET_USER_DATA, START_LOADER, STOP_LOADER, UPDATED_TOKEN } from "./ActionTypes"

export const setUserData = (payload) => {
    return {
        type: SET_USER_DATA,
        payload,
    }
}

export const setUpdatedToken = (payload) => {
    return {
        type: UPDATED_TOKEN,
        payload,
    }
}

export const setChatId = (payload) => {
    return {
        type: SET_CHAT_ID,
        payload
    }
}

export const startLoader = (payload) => {
    return {
        type: START_LOADER,
        payload
    }
}

export const stopLoader = (payload) => {
    return {
        type: STOP_LOADER,
        payload
    }
}