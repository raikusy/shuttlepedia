import { combineReducers } from 'redux';

import launch from './launch';
import rocket from './rocket';

export default combineReducers({
  launch,
  rocket,
});
