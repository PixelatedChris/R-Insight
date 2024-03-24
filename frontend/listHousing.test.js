import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import HomeScreen from './src/screens/HomeScreen';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('HomeScreen Component', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      housingList: { housings: [], loading: false, error: '' },
    });
  });

  test('should display loading when housings are being fetched', () => {
    store = mockStore({
      housingList: { housings: [], loading: true, error: '' },
    });
    render(
      <Provider store={store}>
        <HomeScreen />
      </Provider>
    );
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  test('should display housings once fetched', async () => {
    const housingsMock = [{ id: 1, title: 'Test Housing', description: 'Test Description' }];
    store = mockStore({
      housingList: { housings: housingsMock, loading: false, error: '' },
    });
    render(
      <Provider store={store}>
        <HomeScreen />
      </Provider>
    );
    await waitFor(() => {
      housingsMock.forEach(housing => {
        expect(screen.getByText(housing.title)).toBeInTheDocument();
      });
    });
  });

  test('should display an error message if there is an error fetching housings', () => {
    const errorMessage = 'Error fetching housings';
    store = mockStore({
      housingList: { housings: [], loading: false, error: errorMessage },
    });
    render(
      <Provider store={store}>
        <HomeScreen />
      </Provider>
    );
    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });
});
