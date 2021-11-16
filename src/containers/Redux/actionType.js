import * as valueType from './valueType';
import axiosOrder from '../../axiosOrder';


export const dataLoading = () => {
    return {
        type: valueType.LOADINGUSERDATA,
    }
}
export const fetchedUserData = (data) => {
    return {
        type: valueType.FETCHEDUSERDATA,
        payload: data
    }
}
export const failed = (err) => {
    return {
        type: valueType.FAILEDDATA,
        payload: err
    }
}


// onsearch data
export const loadData = (searchVal) => dispatch => {
    dispatch(dataLoading());
    axiosOrder.get('users/' + searchVal)
        .then(res => {
            if (res.status === 200) {
                dispatch(fetchedUserData(res.data));
            }
        })
        .catch(err => dispatch(failed(err)))
}

// initial data
export const initialData = () => dispatch => {
    dispatch(dataLoading());

    axiosOrder.get('users/github')
        .then(res => {
            if (res.status === 200) {
                dispatch(fetchedUserData(res.data));
            }
        })
        .catch(err => dispatch(failed(err)))
}