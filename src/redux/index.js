import { combineReducers } from 'redux';

import launch from './launch';
import rocket from './rocket';
import article from './article';
import past from './past';
import singleLaunch from './singleLaunch';
import singleRocket from './singleRocket';

export default combineReducers({
  launch,
  rocket,
  article,
  past,
  singleLaunch,
  singleRocket,
});
