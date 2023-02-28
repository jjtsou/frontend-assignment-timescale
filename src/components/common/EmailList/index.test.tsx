import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import EmailList from '../EmailList';

describe('EmailList component', () => {
  const domain = 'timescale.com';
  it('should render properly', () => {
    const { container } = render(
      <EmailList domain={domain}>
        <span>List item</span>
      </EmailList>
    );
    expect(container).toMatchSnapshot();
  });

  it('should render with group', () => {
    const { container } = render(
      <EmailList domain={domain} isGroup>
        <span>List item</span>
      </EmailList>
    );
    expect(container).toMatchSnapshot();
  });

  it('should render with openByDefault', () => {
    const { container } = render(
      <EmailList domain={domain} isGroup openByDefault>
        <span>List item</span>
      </EmailList>
    );
    expect(container).toMatchSnapshot();
  });

  it('should call onSelectDomain when header is clicked', async () => {
    const onSelectDomain = jest.fn();
    const { getByText } = render(
      <EmailList domain={domain} isGroup onSelectDomain={onSelectDomain}>
        <span>List item</span>
      </EmailList>
    );
    const header = getByText(domain);
    await userEvent.click(header);
    expect(onSelectDomain).toHaveBeenCalled();
  });
});
