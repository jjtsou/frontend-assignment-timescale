import { Text } from '@chakra-ui/react';
import { memo } from 'react';

type EmailListItemTypes = {
  isSelected?: boolean;
  onClick?: () => void;
  value: string;
};

const EmailListItem = ({
  isSelected = false,
  onClick,
  value,
}: EmailListItemTypes): JSX.Element => {
  const shouldHavePointerEvents = !!onClick;
  return (
    <Text
      cursor={shouldHavePointerEvents ? 'pointer' : 'initial'}
      color={isSelected ? 'blackAlpha' : 'gray.500'}
      fontWeight={'semibold'}
      onClick={onClick}
      _hover={shouldHavePointerEvents ? { bg: 'gray.200' } : {}}
      py={1}
      px={2}
      rounded={4}
    >
      {value}
    </Text>
  );
};

export default memo(EmailListItem);
