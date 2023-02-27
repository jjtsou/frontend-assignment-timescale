import { Heading, Flex } from '@chakra-ui/react';
import { useRecipientsContext } from '../../context';
import { EmailList, EmailListItem } from '../common';

const SelectedRecipients = (): JSX.Element => {
  const { getGroupedRecipients } = useRecipientsContext();
  const groupedRecipients = getGroupedRecipients();
  return (
    <Flex
      direction="column"
      justifyContent="start"
      alignItems="start"
      minH="45vh"
      p={20}
      pt={10}
      border="2px solid"
      borderColor="gray.400"
      rounded={5}
    >
      <Heading size="md" noOfLines={1} mb={5} color="gray.500">
        Selected Recipients
      </Heading>
      {Object.keys(groupedRecipients).map((groupBy) => (
        <EmailList key={`${groupBy}_list_selected`} domain={groupBy}>
          {groupedRecipients[groupBy].map(({ email, isSelected }, i) => {
            return (
              <EmailListItem
                key={`${email}_${i}`}
                isSelected={isSelected}
                value={email}
              />
            );
          })}
        </EmailList>
      ))}
    </Flex>
  );
};

export default SelectedRecipients;
