import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from './app/store';
import { MemoryRouter as Router } from 'react-router-dom';
import React from 'react';
import App from './App';

describe('App component', () => {
  ['Contacts', 'Bills', 'Export/Import'].forEach(menuItemName => {
    it(`should render ${menuItemName} link`, () => {
      // Act
      render(
        <Router>
          <Provider store={store}>
            <App />
          </Provider>
        </Router>
      );
      // Assert
      expect(screen.getAllByText(menuItemName).length).toBeTruthy();
    });
  });


  it(`should render Bills route by default`, () => {
    const rootPath = "/";

    render(
      <Router initialEntries={[rootPath]}>
        <Provider store={store}>
          <App />
        </Provider>
      </Router>
    );

    expect(screen.getByText("Bills.")).toBeInTheDocument();
  })
});