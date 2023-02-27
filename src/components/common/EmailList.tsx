import EmailListItem from './EmailListItem';
import { SelectRecipientParams, Recipients } from '../../types/Recipient';
import Collapse from './Collapse';

type EmailListTypes = {
  emails: Recipients;
  domain: string;
  openByDefault?: boolean;
  selectRecipient?: ({
    domain,
    email,
    isSelected,
  }: SelectRecipientParams) => void;
  onSelectDomain?: () => void;
};

const EmailList = ({
  emails,
  domain,
  selectRecipient,
  onSelectDomain,
}: EmailListTypes): JSX.Element => (
  <Collapse header={domain} onClickHeader={onSelectDomain}>
    {emails.map(({ email, isSelected }, i) => {
      return (
        <EmailListItem
          key={`${email}_${i}`}
          isSelected={isSelected}
          onClick={
            selectRecipient
              ? () => selectRecipient?.({ email, domain, isSelected })
              : undefined
          }
          value={email}
        />
      );
    })}
  </Collapse>
);

export default EmailList;
