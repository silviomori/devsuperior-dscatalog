import { render, screen } from '@testing-library/react';
import ButtonIcon from '..';

test('buttonIcon should render button with given text', () => {
  const text = 'sign in';
  render(<ButtonIcon text={text} />);
  expect(screen.getByText(text)).toBeInTheDocument();
});
