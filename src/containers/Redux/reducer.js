import * as valueType from './valueType';

const initialState = {
    userInfo: {},
    isLoading: false,
    errorMsg: '',
    authInfo: null,
    authError: '',
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case valueType.LOADINGUSERDATA:
            return {
                ...state,
                isLoading: true,
                errorMsg: ""
            }
        case valueType.FETCHEDUSERDATA:
            return {
                ...state,
                isLoading: false,
                userInfo: action.payload,
                errorMsg: ""
            }

        case valueType.FAILEDDATA:
            return {
                ...state,
                isLoading: false,
                userInfo: {},
                errorMsg: action.payload,
            }

            // authentications cases
        case valueType.AUTHLOADING:
            return {
                ...state,
                isLoading: true,
                authInfo: null,
                authError: ''
            }

        case valueType.AUTHLOADED:
            return {
                ...state,
                isLoading: false,
                authInfo: action.payload,
                authError: ''
            }
        case valueType.AUTHFAILED:
            return {
                ...state,
                isLoading: false,
                authInfo: null,
                authError: action.payload
            }
        default:
            return state;
    }
}

export default reducer;