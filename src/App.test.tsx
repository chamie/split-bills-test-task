import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App';

describe('App component', () => {
  ['Contacts', 'Bills', 'Export/Import'].forEach(menuItemName => {
    it(`should render ${menuItemName} link`, () => {
      // Act
      render(
        <Provider store={store}>
          <App />
        </Provider>
      );
      // Assert
      expect(screen.getAllByText(menuItemName).length).toBeTruthy();
    });
  });
});