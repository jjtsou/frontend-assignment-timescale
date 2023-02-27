import { ReactNode } from 'react';
import Collapse from './Collapse';

type EmailListTypes = {
  domain: string;
  openByDefault?: boolean;
  onSelectDomain?: () => void;
  children: ReactNode;
};

const EmailList = ({
  domain,
  onSelectDomain,
  children,
}: EmailListTypes): JSX.Element => (
  <Collapse header={domain} onClickHeader={onSelectDomain}>
    {/* {emails.map(({ email, isSelected }, i) => {
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
    })} */}
    {children}
  </Collapse>
);

export default EmailList;
