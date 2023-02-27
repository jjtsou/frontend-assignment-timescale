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
  return (
    <Text
      cursor={onClick ? 'pointer' : 'initial'}
      color={isSelected ? 'blackAlpha' : 'gray.500'}
      fontWeight={'semibold'}
      onClick={onClick}
      _hover={onClick ? { bg: 'gray.200' } : {}}
      py={1}
      px={2}
      rounded={4}
    >
      {value}
    </Text>
  );
};

export default memo(EmailListItem);
