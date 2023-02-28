import isValidEmail from '../isValidEmail';

describe('isValidEmail', () => {
  it('returns true for valid emails', () => {
    expect(isValidEmail('john@timescale.com')).toBe(true);
    expect(isValidEmail('john@example.net')).toBe(true);
    expect(isValidEmail('test+email@example.co.uk')).toBe(true);
  });

  it('returns false for invalid emails', () => {
    expect(isValidEmail('notAnEmail')).toBe(false);
    expect(isValidEmail('notAnEmail@')).toBe(false);
    expect(isValidEmail('test@test.')).toBe(false);
    expect(isValidEmail('test@test..com')).toBe(false);
  });
});
