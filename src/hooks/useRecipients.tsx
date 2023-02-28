import { useCallback, useMemo, useState } from 'react';
import { getDomain, normalizeData } from '../utils';
import recipients from '../assets/recipientsData.json';
import {
  Recipients,
  RecipientsByDomain,
  SelectDomainParams,
  SelectRecipientParams,
} from '../types/Recipient';

const getInitialState = (): RecipientsByDomain => normalizeData(recipients);

const useRecipients = () => {
  const [recipients, setRecipients] =
    useState<RecipientsByDomain>(getInitialState);
  const [selectedDomains, setSelectedDomains] = useState<string[]>([]);

  const selectRecipient = ({
    domain,
    email,
    isSelected,
  }: SelectRecipientParams) => {
    const clonedRecipients = structuredClone(recipients);

    const recipientIndex = clonedRecipients[domain].findIndex(
      (recipient) => email === recipient.email
    );
    clonedRecipients[domain][recipientIndex].isSelected = !isSelected;

    setRecipients(clonedRecipients);
  };

  const selectDomain = ({ domain }: SelectDomainParams) => {
    const clonedRecipients = structuredClone(recipients);

    const isDomainSelected = selectedDomains.includes(domain);
    const updatedRecipients = clonedRecipients[domain].map((recipient) => ({
      ...recipient,
      isSelected: !isDomainSelected,
    }));
    clonedRecipients[domain] = updatedRecipients;
    setRecipients(clonedRecipients);

    if (isDomainSelected) {
      const filteredDomains = selectedDomains.filter(
        (selectedDomain) => selectedDomain !== domain
      );
      setSelectedDomains(filteredDomains);
    } else setSelectedDomains([...selectedDomains, domain]);
  };

  const addNewRecipient = (email: string) => {
    const clonedRecipients = structuredClone(recipients);
    const domain = getDomain(email);
    if (!clonedRecipients[domain]) clonedRecipients[domain] = [];
    clonedRecipients[domain].push({ email, isSelected: false });

    setRecipients(clonedRecipients);
  };

  const getGroupedRecipients: () => RecipientsByDomain = useCallback(() => {
    const groupedRecipientsObj: {
      company: Recipients;
      email: Recipients;
    } = { company: [], email: [] };

    Object.keys(recipients).forEach((domain) => {
      const groupBy = recipients[domain].length > 1 ? 'company' : 'email';
      groupedRecipientsObj[groupBy].push(
        ...recipients[domain].filter(({ isSelected }) => !!isSelected)
      );
    });

    return groupedRecipientsObj;
  }, [recipients]);

  return useMemo(
    () => ({
      recipients,
      selectedDomains,
      addNewRecipient,
      getGroupedRecipients,
      selectRecipient,
      selectDomain,
    }),
    [recipients, selectedDomains]
  );
};

export default useRecipients;
