export const GET_PAST_REQUEST = 'GET_PAST_REQUEST';
export const GET_PAST_SUCCESS = 'GET_PAST_SUCCESS';
export const GET_PAST_FAILURE = 'GET_PAST_FAILURE';

const initialState = {
  loading: false,
  launches: [],
  error: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_PAST_REQUEST:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case GET_PAST_SUCCESS:
      return {
        ...state,
        ...action.payload,
        loading: false,
        error: false,
      };
    case GET_PAST_FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
      };
    default:
      return state;
  }
};

export const getPastLaunches = () => dispatch => {
  dispatch({ type: GET_PAST_REQUEST });
  const url = `https://launchlibrary.net/1.4/launch?offset=0&limit=20&sort=desc&enddate=2018-10-15`;
  fetch(url, {
    method: 'GET',
  })
    .then(res => res.json())
    .catch(error => dispatch({ type: GET_PAST_FAILURE, payload: error }))
    .then(response => {
      if (response.error) {
        dispatch({ type: GET_PAST_FAILURE, payload: response });
      } else {
        dispatch({ type: GET_PAST_SUCCESS, payload: response });
      }
    });
};
