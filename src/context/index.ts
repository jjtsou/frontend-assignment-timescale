import { createContext, useContext } from 'react';
import { useRecipientsContextType } from '../types/Recipient';

export const RecipientsContext = createContext<
  useRecipientsContextType | Record<string, never>
>({});
export const useRecipientsContext = () => useContext(RecipientsContext);
