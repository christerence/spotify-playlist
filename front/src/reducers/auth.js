import { createAction, handleActions } from 'redux-actions';

export const actions = {
    login: 'AUTH/LOGIN',
    logout: 'AUTH/LOGOUT',
    logoutCall: 'AUTH/LOGOUT_CALL',
    fetchUser: 'AUTH/FETCH_USER',
}

export const login = createAction(actions.login);
export const logout = createAction(actions.logout);
export const logoutCall = createAction(actions.logoutCall);
export const fetchUser = createAction(actions.fetchUser);

const INITIAL_STATE = {
    user: {}
}

export default handleActions({
    [actions.login]: (state, action) => ({
        user: action.payload
    }),
    [actions.logout]: (state, action) => ({
        user: {}
    })
}, INITIAL_STATE);