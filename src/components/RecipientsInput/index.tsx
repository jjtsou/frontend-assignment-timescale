import { Box } from '@chakra-ui/react';
import { useMemo } from 'react';
import { useRecipientsContext } from '../../context';
import getInputItems from '../../utils/getInputItems';
import { AutoComplete } from '../common';

const RecipientsInput = (): JSX.Element => {
  const { recipients, selectRecipient, addNewRecipient } =
    useRecipientsContext();
  const items = useMemo(() => getInputItems(recipients), [recipients]);

  return (
    <Box position="absolute" width={200} mt={20}>
      <AutoComplete
        items={items}
        placeholder={'Type an email'}
        onCreateItem={addNewRecipient}
        onSelectItem={selectRecipient}
      />
    </Box>
  );
};

export default RecipientsInput;
