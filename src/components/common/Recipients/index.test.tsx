import { render } from '@testing-library/react';
import Recipients from '../Recipients';

const recipients = {
  'gmail.com': [
    {
      email: 'john@gmail.com',
      isSelected: false,
    },
    {
      email: 'alex@gmail.com',
      isSelected: true,
    },
  ],
  'timescale.com': [
    {
      email: 'mary@timescale.com',
      isSelected: false,
    },
  ],
};

test('renders correctly', () => {
  const { asFragment } = render(
    <Recipients header="Recipients" recipients={recipients} />
  );
  expect(asFragment()).toMatchSnapshot();
});
