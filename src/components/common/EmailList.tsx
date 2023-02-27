import { ReactNode } from 'react';
import Collapse from './Collapse';

type EmailListTypes = {
  domain: string;
  openByDefault?: boolean;
  isGroup?: boolean;
  onSelectDomain?: () => void;
  children: ReactNode;
};

const EmailList = ({
  domain,
  onSelectDomain,
  children,
  isGroup,
}: EmailListTypes): JSX.Element => {
  if (isGroup)
    return (
      <Collapse header={domain} onClickHeader={onSelectDomain}>
        {children}
      </Collapse>
    );
  return <>{children}</>;
};

export default EmailList;
