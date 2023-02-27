import { Heading, Flex } from '@chakra-ui/react';
import { RecipientsByDomain } from '../../types/Recipient';
import { EmailList, EmailListItem } from '.';

type RecipientsProps = {
  header: string;
  recipients: RecipientsByDomain;
  handleSelectRecipient?: ({
    domain,
    email,
    isSelected,
  }: {
    domain: string;
    email: string;
    isSelected: boolean;
  }) => void;
  handleSelectDomain?: ({ domain }: { domain: string }) => void;
  isSelectable?: boolean;
  isGroup?: boolean;
};

const Recipients = ({
  header,
  recipients,
  handleSelectRecipient,
  handleSelectDomain,
  isSelectable,
  isGroup,
}: RecipientsProps): JSX.Element => {
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
        {header}
      </Heading>
      {Object.keys(recipients).map((domain) => (
        <EmailList
          key={`${domain}_list`}
          domain={domain}
          onSelectDomain={
            isSelectable ? () => handleSelectDomain?.({ domain }) : undefined
          }
          isGroup={isGroup || recipients[domain].length > 1}
          openByDefault={!!recipients[domain].length}
        >
          {recipients[domain].map(({ email, isSelected }, i) => {
            return (
              <EmailListItem
                key={`${email}_${i}_list_item`}
                isSelected={isSelected}
                value={email}
                onClick={
                  isSelectable
                    ? () =>
                        handleSelectRecipient?.({ domain, email, isSelected })
                    : undefined
                }
              />
            );
          })}
        </EmailList>
      ))}
    </Flex>
  );
};

export default Recipients;
