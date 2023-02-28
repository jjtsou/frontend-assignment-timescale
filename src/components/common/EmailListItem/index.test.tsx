import { render } from '@testing-library/react';
import EmailListItem from '../EmailListItem';

describe('EmailListItem', () => {
  it('should render correctly', () => {
    const { container } = render(<EmailListItem value="test@example.com" />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('should render as selected when isSelected prop is true', () => {
    const { container } = render(
      <EmailListItem value="test@example.com" isSelected />
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  it('should render as a button when onClick prop is provided', () => {
    const { container } = render(
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      <EmailListItem value="test@example.com" onClick={() => {}} />
    );
    expect(container.firstChild).toMatchSnapshot();
  });
});
