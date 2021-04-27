import { combineReducers } from 'redux';
import reducersPost from './reducersPost';
export default combineReducers({
    posts: reducersPost,
});
