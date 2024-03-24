import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axiosMock from 'axios-mock-adapter';
import axios from 'axios';
import {
  listHousings
} from '../actions/housingActions';
import {
  HOUSING_LIST_REQUEST,
  HOUSING_LIST_SUCCESS,
  HOUSING_LIST_FAIL
} from '../constants/housingConstants';
import { housingListReducer } from '../reducers/housingReducers';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const mockAxios = new axiosMock(axios);

describe('Housing Redux', () => {
  describe('listHousings Action', () => {
    afterEach(() => {
      mockAxios.reset();
    });

    test('dispatches HOUSING_LIST_SUCCESS after a successful API request', () => {
      const store = mockStore({});
      const mockData = [{ id: 1, title: 'Test Housing' }];
      mockAxios.onGet(process.env.REACT_APP_API_BASE_URL + '/api/housing').reply(200, mockData);

      const expectedActions = [
        { type: HOUSING_LIST_REQUEST },
        { type: HOUSING_LIST_SUCCESS, payload: mockData },
      ];

      return store.dispatch(listHousings()).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });

    test('dispatches HOUSING_LIST_FAIL after a failed API request', () => {
      const store = mockStore({});
      mockAxios.onGet(process.env.REACT_APP_API_BASE_URL + '/api/housing').reply(500);

      const expectedActions = [
        { type: HOUSING_LIST_REQUEST },
        { type: HOUSING_LIST_FAIL, payload: 'Request failed with status code 500' },
      ];

      return store.dispatch(listHousings()).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });
  });

  describe('housingListReducer', () => {
    test('should return the initial state', () => {
      expect(housingListReducer(undefined, {})).toEqual({ housings: [] });
    });

    test('should handle HOUSING_LIST_REQUEST', () => {
      expect(housingListReducer({}, { type: HOUSING_LIST_REQUEST })).toEqual({ loading: true, housings: [] });
    });

    test('should handle HOUSING_LIST_SUCCESS', () => {
      expect(
        housingListReducer({}, { type: HOUSING_LIST_SUCCESS, payload: [{ id: 1, title: 'Test' }] })
      ).toEqual({ loading: false, housings: [{ id: 1, title: 'Test' }] });
    });

    test('should handle HOUSING_LIST_FAIL', () => {
      expect(housingListReducer({}, { type: HOUSING_LIST_FAIL, payload: 'Error' })).toEqual({
        loading: false,
        error: 'Error',
        housings: [],
      });
    });
  });
});
