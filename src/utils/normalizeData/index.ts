import {
  Recipient,
  Recipients,
  RecipientsByDomain,
} from '../../types/Recipient';
import getDomain from '../getDomain';

const normalizeData = (recipients: Recipients): RecipientsByDomain =>
  recipients.reduce((acc: RecipientsByDomain, recipient: Recipient) => {
    const { email } = recipient;
    const domain = getDomain(email);

    if (!acc[domain]) acc[domain] = [];
    acc[domain].push(recipient);

    return acc;
  }, {});

export default normalizeData;
