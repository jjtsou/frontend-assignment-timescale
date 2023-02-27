const getDomain = (email: string) => email.substring(email.indexOf('@') + 1);

export default getDomain;
