import { combineReducers } from 'redux';
import { reducer as FormReducer } from 'redux-form';
import AuthReducer from './auth';
import SpotifyReducer from './spotify';

export default combineReducers({
    form: FormReducer,
    auth: AuthReducer,
    spotify: SpotifyReducer
});