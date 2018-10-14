export const GET_NEXT_LAUNCH_REQUEST = 'GET_NEXT_LAUNCH_REQUEST';
export const GET_NEXT_LAUNCH_SUCCESS = 'GET_NEXT_LAUNCH_SUCCESS';
export const GET_NEXT_LAUNCH_FAILURE = 'GET_NEXT_LAUNCH_FAILURE';

const initialState = {
  loading: false,
  launches: [],
  error: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_NEXT_LAUNCH_REQUEST:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case GET_NEXT_LAUNCH_SUCCESS:
      return {
        ...state,
        ...action.payload,
        loading: false,
        error: false,
      };
    case GET_NEXT_LAUNCH_FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
      };
    default:
      return state;
  }
};

export const getLaunches = () => dispatch => {
  dispatch({ type: GET_NEXT_LAUNCH_REQUEST });
  const url = `https://launchlibrary.net/1.4/launch/next/5`;
  fetch(url, {
    method: 'GET',
  })
    .then(res => res.json())
    .catch(error => dispatch({ type: GET_NEXT_LAUNCH_FAILURE, payload: error }))
    .then(response => {
      if (response.error) {
        dispatch({ type: GET_NEXT_LAUNCH_FAILURE, payload: response });
      } else {
        dispatch({ type: GET_NEXT_LAUNCH_SUCCESS, payload: response });
      }
    });
};
