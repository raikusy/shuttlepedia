export const GET_ARTICLE_REQUEST = 'GET_ARTICLE_REQUEST';
export const GET_ARTICLE_SUCCESS = 'GET_ARTICLE_SUCCESS';
export const GET_ARTICLE_FAILURE = 'GET_ARTICLE_FAILURE';

const initialState = {
  loading: false,
  articles: [],
  error: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_ARTICLE_REQUEST:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case GET_ARTICLE_SUCCESS:
      return {
        ...state,
        articles: action.payload,
        loading: false,
        error: false,
      };
    case GET_ARTICLE_FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
      };
    default:
      return state;
  }
};

export const getArticles = () => dispatch => {
  dispatch({ type: GET_ARTICLE_REQUEST });
  const url = `https://api.spaceflightnewsapi.net/articles?limit=20`;
  fetch(url, {
    method: 'GET',
  })
    .then(res => res.json())
    .catch(error => dispatch({ type: GET_ARTICLE_FAILURE, payload: error }))
    .then(response => {
      if (response.error) {
        dispatch({ type: GET_ARTICLE_FAILURE, payload: response });
      } else {
        dispatch({ type: GET_ARTICLE_SUCCESS, payload: response });
      }
    });
};
