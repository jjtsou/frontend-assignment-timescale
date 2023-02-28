import { render } from '@testing-library/react';
import useEvent from '@testing-library/user-event';
import Collapse from '../Collapse';

describe('Collapse', () => {
  it('renders correctly', () => {
    const { asFragment } = render(
      <Collapse header="Header">
        <span>Content</span>
      </Collapse>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders with the header and content visible when is openByDefault', () => {
    const { asFragment } = render(
      <Collapse header="Header" openByDefault>
        <span>Content</span>
      </Collapse>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('calls onClickHeader when header is clicked', async () => {
    const onClickHeader = jest.fn();
    const { getByText } = render(
      <Collapse header="Header" onClickHeader={onClickHeader}>
        <span>Content</span>
      </Collapse>
    );
    const header = getByText('Header');
    await useEvent.click(header);
    expect(onClickHeader).toHaveBeenCalled();
  });
});
