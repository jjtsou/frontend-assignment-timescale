import { ReactNode, useCallback, useState } from 'react';
import {
  Flex,
  IconButton,
  Text,
  Collapse as ChakraCollapse,
  Button,
} from '@chakra-ui/react';
import { ChevronDownIcon, ChevronRightIcon } from '@chakra-ui/icons';

type CollapseTypes = {
  header: string;
  openByDefault?: boolean;
  onClickHeader?: () => void;
  children: ReactNode;
};

const Collapse = ({
  header,
  openByDefault = false,
  onClickHeader,
  children,
}: CollapseTypes): JSX.Element => {
  const [isOpen, setIsOpen] = useState(openByDefault);
  const handleToggle = useCallback(() => setIsOpen((isOpen) => !isOpen), []);
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
          as={Button}
          fontWeight="semibold"
          color="gray.500"
          onClick={onClickHeader}
          cursor={onClickHeader ? 'pointer' : 'initial'}
        >
          {header}
        </Text>
      </Flex>
      <ChakraCollapse in={isOpen} animate animateOpacity>
        <Flex direction="column" pl={10}>
          {children}
        </Flex>
      </ChakraCollapse>
    </Flex>
  );
};

export default Collapse;
