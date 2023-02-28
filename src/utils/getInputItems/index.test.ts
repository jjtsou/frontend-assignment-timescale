import getInputItems from '../getInputItems';

describe('getInputItems', () => {
  it('returns an array of items', () => {
    const recipients = {
      'test.io': [
        { email: 'mary@test.io', isSelected: false },
        { email: 'helena@test.io', isSelected: false },
      ],
      'email.net': [{ email: 'jacob@email.net', isSelected: false }],
    };
    const expected = [
      { label: 'mary@test.io', value: 'mary@test.io' },
      { label: 'helena@test.io', value: 'helena@test.io' },
      { label: 'jacob@email.net', value: 'jacob@email.net' },
    ];
    expect(getInputItems(recipients)).toEqual(expected);
  });

  it('filters out items that are already selected', () => {
    const recipients = {
      'test.com': [
        { email: 'selected@test.com', isSelected: true },
        { email: 'selected2@test.com', isSelected: true },
        { email: 'jane@test.com', isSelected: false },
      ],
      'email.net': [
        { email: 'johnny@email.net', isSelected: true },
        { email: 'jacob@email.net', isSelected: false },
      ],
    };
    const expected = [
      { label: 'jane@test.com', value: 'jane@test.com' },
      { label: 'jacob@email.net', value: 'jacob@email.net' },
    ];
    expect(getInputItems(recipients)).toEqual(expected);
  });

  it('returns an empty array when given an empty object', () => {
    const recipients = {};
    const expected: any[] = [];
    expect(getInputItems(recipients)).toEqual(expected);
  });
});
