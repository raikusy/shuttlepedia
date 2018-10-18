export const GET_SINGLE_LAUNCH_REQUEST = 'GET_SINGLE_LAUNCH_REQUEST';
export const GET_SINGLE_LAUNCH_SUCCESS = 'GET_SINGLE_LAUNCH_SUCCESS';
export const GET_SINGLE_LAUNCH_FAILURE = 'GET_SINGLE_LAUNCH_FAILURE';

const initialState = {
  loading: false,
  data: {},
  error: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_SINGLE_LAUNCH_REQUEST:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case GET_SINGLE_LAUNCH_SUCCESS:
      return {
        ...state,
        data: action.payload.launches[0],
        loading: false,
        error: false,
      };
    case GET_SINGLE_LAUNCH_FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
      };
    default:
      return state;
  }
};

export const getSingleLaunch = id => dispatch => {
  dispatch({ type: GET_SINGLE_LAUNCH_REQUEST });
  const url = `https://launchlibrary.net/1.4/launch/${id}`;
  fetch(url, {
    method: 'GET',
  })
    .then(res => res.json())
    .catch(error => dispatch({ type: GET_SINGLE_LAUNCH_FAILURE, payload: error }))
    .then(response => {
      if (response.error) {
        dispatch({ type: GET_SINGLE_LAUNCH_FAILURE, payload: response });
      } else {
        dispatch({ type: GET_SINGLE_LAUNCH_SUCCESS, payload: response });
      }
    });
};
