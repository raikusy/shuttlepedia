export const GET_ROCKET_REQUEST = 'GET_ROCKET_REQUEST';
export const GET_ROCKET_SUCCESS = 'GET_ROCKET_SUCCESS';
export const GET_ROCKET_FAILURE = 'GET_ROCKET_FAILURE';

const initialState = {
  loading: false,
  rockets: [],
  error: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_ROCKET_REQUEST:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case GET_ROCKET_SUCCESS:
      return {
        ...state,
        ...action.payload,
        loading: false,
        error: false,
      };
    case GET_ROCKET_FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
      };
    default:
      return state;
  }
};

export const getRockets = () => dispatch => {
  dispatch({ type: GET_ROCKET_REQUEST });
  const url = `https://launchlibrary.net/1.4/rocket`;
  fetch(url, {
    method: 'GET',
  })
    .then(res => res.json())
    .catch(error => dispatch({ type: GET_ROCKET_FAILURE, payload: error }))
    .then(response => {
      if (response.error) {
        dispatch({ type: GET_ROCKET_FAILURE, payload: response });
      } else {
        dispatch({ type: GET_ROCKET_SUCCESS, payload: response });
      }
    });
};
