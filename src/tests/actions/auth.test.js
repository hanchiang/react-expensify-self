import { login, logout } from '../../actions/auth';

test('should return login action object', () => {
  const uid = 1;
  const action = login(uid);
  const expectedAction = {
    type: 'LOGIN',
    uid
  }
  expect(action).toEqual(expectedAction);
});

test('should return login action object', () => {
  const uid = 1;
  const action = logout();
  const expectedAction = {
    type: 'LOGOUT'
  }
  expect(action).toEqual(expectedAction);
});