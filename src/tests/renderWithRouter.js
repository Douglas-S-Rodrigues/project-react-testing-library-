import { render } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import React from 'react';

function renderWithRouter(component) {
  const memoryHistory = createMemoryHistory();
  render(
    <Router history={ memoryHistory }>
      { component }
    </Router>,
  );
  return memoryHistory;
}

export default renderWithRouter;
