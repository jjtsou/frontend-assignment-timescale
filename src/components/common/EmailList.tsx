import { useCallback, useEffect, useState } from 'react';
import { Flex, IconButton, Text, Collapse } from '@chakra-ui/react';
import { ChevronDownIcon, ChevronRightIcon } from '@chakra-ui/icons';
import EmailListItem from './EmailListItem';
import {
  SelectDomainParams,
  SelectRecipientParams,
  Recipients,
} from '../../types/Recipient';

type EmailListTypes = {
  emails: Recipients;
  domain: string;
  openByDefault?: boolean;
  selectRecipient?: ({
    domain,
    email,
    isSelected,
  }: SelectRecipientParams) => void;
  selectDomain?: ({ domain }: SelectDomainParams) => void;
};

const EmailList = ({
  emails,
  domain,
  openByDefault = false,
  selectRecipient,
  selectDomain,
}: EmailListTypes): JSX.Element => {
  const [isOpen, setIsOpen] = useState(openByDefault);
  const handleToggle = useCallback(() => setIsOpen((isOpen) => !isOpen), []);

  useEffect(() => {
    if (!emails.length) setIsOpen(false);
    else setIsOpen(true);
  }, [emails.length]);

  return (
    <Flex direction="column">
      <Flex justifyContent="start" alignItems="center">
        <IconButton
          variant="ghost"
          aria-label="Open collapsible panel"
          icon={isOpen ? <ChevronDownIcon /> : <ChevronRightIcon />}
          size="sm"
          onClick={handleToggle}
          minW={6}
        />
        <Text
          fontWeight="semibold"
          color="gray.500"
          onClick={selectDomain ? () => selectDomain({ domain }) : undefined}
          cursor={selectDomain ? 'pointer' : 'initial'}
        >
          {domain}
        </Text>
      </Flex>
      <Collapse in={isOpen} animate animateOpacity>
        <Flex direction="column" pl={10}>
          {emails.map(({ email, isSelected }, i) => {
            return (
              <EmailListItem
                key={`${email}_${i}`}
                isSelected={isSelected}
                onClick={
                  selectRecipient
                    ? () => selectRecipient({ email, domain, isSelected })
                    : undefined
                }
                value={email}
              />
            );
          })}
        </Flex>
      </Collapse>
    </Flex>
  );
};

export default EmailList;
