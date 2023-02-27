import { Button, Text } from '@chakra-ui/react';
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
      as={onClick ? Button : Text}
      color={isSelected ? 'blackAlpha' : 'gray.500'}
      fontWeight={'semibold'}
      onClick={onClick}
      py={1}
      px={2}
    >
      {value}
    </Text>
  );
};

export default memo(EmailListItem);
