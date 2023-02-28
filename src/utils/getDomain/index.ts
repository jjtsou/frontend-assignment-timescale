const getDomain = (email: string) => {
  const index = email.indexOf('@');
  if (index !== -1) return email.substring(index + 1);
  return '';
};

export default getDomain;
