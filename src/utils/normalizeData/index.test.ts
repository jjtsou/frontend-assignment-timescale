import normalizeData from '../normalizeData';
import { Recipients, RecipientsByDomain } from '../../types/Recipient';
import getDomain from '../getDomain';

jest.mock('../getDomain');

const mockedGetDomain = getDomain as jest.MockedFn<typeof getDomain>;

describe('normalizeData', () => {
  beforeEach(() => {
    mockedGetDomain.mockReset();
  });

  it('returns an empty object when passed an empty array', () => {
    const recipients: Recipients = [];
    const result = normalizeData(recipients);
    expect(result).toEqual({});
  });

  it('groups recipients by domain', () => {
    mockedGetDomain
      .mockReturnValueOnce('timescale.com')
      .mockReturnValueOnce('timescale.com')
      .mockReturnValueOnce('test.io');

    const recipients: Recipients = [
      { email: 'john@timescale.com', isSelected: true },
      { email: 'mike@timescale.com', isSelected: false },
      { email: 'johnny@test.io', isSelected: false },
    ];

    const result: RecipientsByDomain = {
      'timescale.com': [
        { email: 'john@timescale.com', isSelected: true },
        { email: 'mike@timescale.com', isSelected: false },
      ],
      'test.io': [{ email: 'johnny@test.io', isSelected: false }],
    };

    expect(normalizeData(recipients)).toEqual(result);
  });
});
