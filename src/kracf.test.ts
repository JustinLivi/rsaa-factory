import { createStandardTypes, RsaaActionType } from './kracf';

describe('createStandardTypes', () => {
  it('should create a standard types array', () => {
    const standardTypes = createStandardTypes({
      method: 'GET',
      endpoint: '/basic'
    });
    expect(standardTypes).toEqual([
      {
        meta: {
          method: 'GET',
          endpoint: '/basic'
        },
        type: RsaaActionType.RSAA_REQUEST
      },
      {
        meta: {
          method: 'GET',
          endpoint: '/basic'
        },
        type: RsaaActionType.RSAA_SUCCESS
      },
      {
        meta: {
          method: 'GET',
          endpoint: '/basic'
        },
        type: RsaaActionType.RSAA_FAILURE
      }
    ]);
  });
});
