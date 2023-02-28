import * as React from 'react';
import { useCombobox, useMultipleSelection } from 'downshift';
import { matchSorter } from 'match-sorter';
import Highlighter from 'react-highlight-words';
import useDeepCompareEffect from 'react-use/lib/useDeepCompareEffect';
import { Stack, Box, List, ListItem } from '@chakra-ui/react';
import { Input } from '@chakra-ui/input';
import { Text } from '@chakra-ui/react';
import { getDomain, isValidEmail } from '../../utils';
import { SelectRecipientParams } from '../../types/Recipient';

type Item = {
  label: string;
  value: string;
};

type AutoCompleteProps = {
  items: Item[];
  placeholder: string;
  onCreateItem: (value: string) => void;
  onSelectItem: ({ domain, email, isSelected }: SelectRecipientParams) => void;
};

const AutoComplete = (
  props: AutoCompleteProps
): React.ReactElement<AutoCompleteProps> => {
  const { items, placeholder, onCreateItem, onSelectItem } = props;

  const [isCreating, setIsCreating] = React.useState(false);
  const [inputValue, setInputValue] = React.useState('');
  const [inputItems, setInputItems] = React.useState<Item[]>(items);

  const disclosureRef = React.useRef(null);
  const { getDropdownProps } = useMultipleSelection();

  const comboBoxProps = {
    inputValue,
    selectedItem: undefined,
    items: inputItems,
    onInputValueChange: ({
      inputValue,
      selectedItem,
    }: {
      inputValue: string;
      selectedItem: Item;
    }) => {
      const filteredItems = matchSorter(items, inputValue || '', {
        keys: ['value', 'label'],
      });

      if (isCreating && filteredItems.length > 0) {
        setIsCreating(false);
      }

      if (!selectedItem) {
        setInputItems(filteredItems);
      }
    },
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    stateReducer: (state, actionAndChanges) => {
      const { changes, type } = actionAndChanges;
      switch (type) {
        case useCombobox.stateChangeTypes.InputBlur:
          return {
            ...changes,
            isOpen: false,
          };
        case useCombobox.stateChangeTypes.InputKeyDownEnter:
        case useCombobox.stateChangeTypes.ItemClick:
          return {
            ...changes,
            highlightedIndex: state.highlightedIndex,
            inputValue,
            isOpen: true,
          };
        case useCombobox.stateChangeTypes.FunctionSelectItem:
          return {
            ...changes,
            inputValue,
          };
        default:
          return changes;
      }
    },
    onStateChange: ({
      inputValue,
      type,
      selectedItem,
    }: {
      inputValue: string;
      type: string;
      selectedItem: Item;
    }) => {
      switch (type) {
        case useCombobox.stateChangeTypes.InputChange:
          setInputValue(inputValue || '');
          break;
        case useCombobox.stateChangeTypes.InputKeyDownEnter:
        case useCombobox.stateChangeTypes.ItemClick:
          if (selectedItem && isValidEmail(selectedItem.label)) {
            if (onCreateItem && isCreating) {
              onCreateItem(selectedItem.label);
              setIsCreating(false);
              setInputItems(items);
            } else {
              const email = selectedItem.value;
              const domain = getDomain(email);
              onSelectItem({ domain, email, isSelected: false });
            }
          }
          setInputValue('');
          selectItem(null);
          break;
        default:
          break;
      }
    },
  };

  const {
    isOpen,
    getMenuProps,
    getInputProps,
    highlightedIndex,
    getItemProps,
    openMenu,
    selectItem,
    setHighlightedIndex,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
  } = useCombobox(comboBoxProps);

  React.useEffect(() => {
    if (inputItems.length === 0) {
      setIsCreating(true);
      setInputItems([{ label: `${inputValue}`, value: inputValue }]);
      setHighlightedIndex(0);
    }
  }, [inputItems, setIsCreating, setHighlightedIndex, inputValue]);

  useDeepCompareEffect(() => {
    setInputItems(items);
  }, [items]);

  return (
    <Stack>
      <Stack isInline>
        <Input
          {...getInputProps(
            getDropdownProps({
              placeholder,
              // eslint-disable-next-line @typescript-eslint/no-empty-function
              onClick: isOpen ? () => {} : openMenu,
              // eslint-disable-next-line @typescript-eslint/no-empty-function
              onFocus: isOpen ? () => {} : openMenu,
              ref: disclosureRef,
            })
          )}
        />
      </Stack>
      <Box pb={4} mb={4}>
        <List
          bg="gray.100"
          borderRadius="4px"
          border={isOpen && '1px solid rgba(0,0,0,0.1)'}
          boxShadow="6px 5px 8px rgba(0,50,30,0.02)"
          {...getMenuProps()}
        >
          {isOpen &&
            inputItems.map((item, index) => (
              <ListItem
                px={2}
                py={1}
                borderBottom="1px solid rgba(0,0,0,0.01)"
                bg={highlightedIndex === index ? 'gray.200' : 'inherit'}
                key={`${item.value}${index}`}
                {...getItemProps({ item, index })}
              >
                {isCreating ? (
                  <Text cursor="pointer">Create {item.label}</Text>
                ) : (
                  <Box
                    display="inline-flex"
                    alignItems="center"
                    cursor="pointer"
                  >
                    <Highlighter
                      autoEscape
                      searchWords={[inputValue || '']}
                      textToHighlight={item.label}
                      highlightStyle={{ background: 'lightgrey' }}
                    />
                  </Box>
                )}
              </ListItem>
            ))}
        </List>
      </Box>
    </Stack>
  );
};

export default AutoComplete;
