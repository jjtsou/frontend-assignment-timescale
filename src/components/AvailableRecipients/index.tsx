import { useRecipientsContext } from '../../context';
import { Recipients } from '../common';

const AvailableRecipients = (): JSX.Element => {
  const { recipients, selectRecipient, selectDomain } = useRecipientsContext();

  return (
    <Recipients
      header="Available Recipients"
      recipients={recipients}
      handleSelectRecipient={selectRecipient}
      handleSelectDomain={selectDomain}
      isSelectable
    />
  );
};

export default AvailableRecipients;
