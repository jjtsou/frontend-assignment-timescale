import { useRecipientsContext } from '../../context';
import { Recipients } from '../common';

const SelectedRecipients = (): JSX.Element => {
  const { getGroupedRecipients } = useRecipientsContext();
  const groupedRecipients = getGroupedRecipients();
  return (
    <Recipients
      header="Selected Recipients"
      recipients={groupedRecipients}
      isGroup
    />
  );
};

export default SelectedRecipients;
