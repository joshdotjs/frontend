import { render, screen, fireEvent, within } from '@testing-library/react';
import App from './_App';
import './util/console-node';

import { describe, it, expect, beforeEach } from 'vitest';
// -not needed due to --globals flag
// -helps intellisense though

// ================================================
// ================================================
// ================================================
// ================================================

describe('Cart Context', () => {

  // ==============================================

  it('should pass sanity check', () => {
    render(<App />);
    // screen.debug();
    expect(true).toBe(true);
  });

  // ==============================================

  it('should render cart button', () => {
    render(<App />);
    // screen.debug();
    const cart_button = screen.getByTestId('open-cart-button');
    // screen.debug(cart_button);
    expect(cart_button).toBeInTheDocument();
  });

});

// ================================================
// ================================================
// ================================================
// ================================================