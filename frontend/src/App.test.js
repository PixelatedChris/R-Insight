import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import configureStore from 'redux-mock-store'; 

const mockStore = configureStore([]);
const store = mockStore({
  // Mock your initial Redux state here
});

test('renders the app with a header, footer, and main content area', () => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  );

  
  expect(screen.getByRole('banner')).toBeInTheDocument(); 
  expect(screen.getByRole('main')).toBeInTheDocument(); 
  expect(screen.getByRole('contentinfo')).toBeInTheDocument(); 

});
