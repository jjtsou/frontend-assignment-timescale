import { createContext, ReactNode, useContext, useMemo } from 'react';
import { useRecipients } from '../hooks';
import { useRecipientsContextType } from '../types/Recipient';

const Context = createContext<useRecipientsContextType | Record<string, never>>(
  {}
);
export const useRecipientsContext = () => useContext(Context);

export const RecipientsContext = ({ children }: { children: ReactNode }) => {
  const {
    recipients,
    selectedDomains,
    getGroupedRecipients,
    addNewRecipient,
    selectRecipient,
    selectDomain,
  } = useRecipients();

  const contextValue = useMemo(
    () => ({
      recipients,
      selectedDomains,
      getGroupedRecipients,
      addNewRecipient,
      selectRecipient,
      selectDomain,
    }),
    [
      recipients,
      selectedDomains,
      getGroupedRecipients,
      addNewRecipient,
      selectRecipient,
      selectDomain,
    ]
  );
  return <Context.Provider value={contextValue}>{children}</Context.Provider>;
};
