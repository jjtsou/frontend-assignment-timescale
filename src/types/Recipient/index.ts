export type Recipient = { email: string; isSelected: boolean };

export type Recipients = Recipient[];

export type RecipientsByDomain = { [key: string]: Recipients };

export type SelectRecipientParams = {
  domain: string;
  email: string;
  isSelected: boolean;
};
export type SelectDomainParams = {
  domain: string;
};

export type SelectRecipientType = ({
  email,
  domain,
  isSelected,
}: {
  email: string;
  domain: string;
  isSelected: boolean;
}) => void;

export type useRecipientsContextType = {
  recipients: RecipientsByDomain;
  selectedDomains: string[];
  getGroupedRecipients: () => RecipientsByDomain;
  addNewRecipient: (email: string) => void;
  selectRecipient: ({
    domain,
    email,
    isSelected,
  }: SelectRecipientParams) => void;
  selectDomain: ({ domain }: SelectDomainParams) => void;
};
