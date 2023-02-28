import getDomain from '../getDomain';

describe('getDomain', () => {
  it('returns the domain of an email', () => {
    expect(getDomain('user@timescale.com')).toBe('timescale.com');
    expect(getDomain('test.user@domain.co.uk')).toBe('domain.co.uk');
  });

  it('returns an empty string when the email is invalid', () => {
    expect(getDomain('notAnEmail')).toBe('');
    expect(getDomain('test@')).toBe('');
  });
});
