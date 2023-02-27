import { Heading, Flex } from '@chakra-ui/react';
import { EmailList, EmailListItem } from '../common';
import { useRecipientsContext } from '../../context';

const AvailableRecipients = (): JSX.Element => {
  const { recipients, selectRecipient, selectDomain } = useRecipientsContext();
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
        Available Recipients
      </Heading>
      <Flex
        direction="column"
        justifyContent="start"
        alignItems="start"
        gap={1}
      >
        {Object.keys(recipients).map((domain) => {
          const emails = recipients[domain];
          return emails.length > 1 ? (
            <EmailList
              key={`${domain}_list_available`}
              domain={domain}
              openByDefault
              onSelectDomain={() => selectDomain({ domain })}
            >
              {emails.map(({ email, isSelected }, i) => {
                return (
                  <EmailListItem
                    key={`${email}_${i}`}
                    onClick={() =>
                      selectRecipient({ domain, email, isSelected })
                    }
                    value={email}
                    isSelected={isSelected}
                  />
                );
              })}
            </EmailList>
          ) : (
            <EmailListItem
              key={`${emails[0].email}_list_available`}
              isSelected={emails[0].isSelected}
              onClick={() =>
                selectRecipient({
                  email: emails[0].email,
                  domain,
                  isSelected: emails[0].isSelected,
                })
              }
              value={emails[0].email}
            />
          );
        })}
      </Flex>
    </Flex>
  );
};

export default AvailableRecipients;
