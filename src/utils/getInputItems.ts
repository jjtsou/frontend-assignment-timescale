import { RecipientsByDomain } from '../types/Recipient';

type Items = { label: string; value: string }[];

const getInputItems = (recipients: RecipientsByDomain): Items =>
  Object.values(recipients)
    .flatMap((emails) => emails)
    .filter(({ isSelected }) => !isSelected)
    .map(({ email }) => ({ label: email, value: email }));

export default getInputItems;
