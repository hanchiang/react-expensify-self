import authReducer from '../../reducers/auth';

test('should set user uid for login', () => {
  const uid = 1;
  const action = {
    type: 'LOGIN',
    uid
  };
  const initialState = {};
  const state = authReducer(initialState, action);
  expect(state.uid).toBe(uid);
});

test('should clear user uid for logout', () => {
  const uid = 1;
  const action = {
    type: 'LOGOUT',
    uid
  };
  const initialState = {uid};
  const state = authReducer(initialState, action);
  expect(state).toEqual({});
});