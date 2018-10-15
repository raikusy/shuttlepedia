import { combineReducers } from 'redux';

import launch from './launch';
import rocket from './rocket';
import article from './article';

export default combineReducers({
  launch,
  rocket,
  article,
});
