import { combineReducers } from 'redux';

import launch from './launch';
import rocket from './rocket';
import article from './article';
import past from './past';

export default combineReducers({
  launch,
  rocket,
  article,
  past,
});
