export const GET_SINGLE_ROCKET_REQUEST = 'GET_SINGLE_ROCKET_REQUEST';
export const GET_SINGLE_ROCKET_SUCCESS = 'GET_SINGLE_ROCKET_SUCCESS';
export const GET_SINGLE_ROCKET_FAILURE = 'GET_SINGLE_ROCKET_FAILURE';

const initialState = {
  loading: false,
  data: {},
  error: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_SINGLE_ROCKET_REQUEST:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case GET_SINGLE_ROCKET_SUCCESS:
      return {
        ...state,
        data: action.payload.rockets[0],
        loading: false,
        error: false,
      };
    case GET_SINGLE_ROCKET_FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
      };
    default:
      return state;
  }
};

export const getSingleRocket = id => dispatch => {
  dispatch({ type: GET_SINGLE_ROCKET_REQUEST });
  const url = `https://launchlibrary.net/1.4/rocket/${id}`;
  fetch(url, {
    method: 'GET',
  })
    .then(res => res.json())
    .catch(error => dispatch({ type: GET_SINGLE_ROCKET_FAILURE, payload: error }))
    .then(response => {
      if (response.error) {
        dispatch({ type: GET_SINGLE_ROCKET_FAILURE, payload: response });
      } else {
        dispatch({ type: GET_SINGLE_ROCKET_SUCCESS, payload: response });
      }
    });
};
