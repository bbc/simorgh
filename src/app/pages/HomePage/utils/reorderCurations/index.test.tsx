import reorderCurations from './index';
import { Curation } from '../../../../models/types/curationData';

const createCuration = (
  curationId: string,
  overrides: Partial<Curation> = {},
): Curation => ({
  curationId,
  visualStyle: 'DEFAULT',
  visualProminence: 'NORMAL',
  position: 0,
  ...overrides,
});

describe('reorderCurations', () => {
  it('reorders selected AV curations for hindi after top stories, keeping other curations in original order', () => {
    const curations = [
      createCuration('top-stories'),
      createCuration('dummy-1'),
      createCuration('urn:bbc:tipo:list:2323cbdf-5d76-425c-94e0-fe743831ce17'), // TV Bulletin
      createCuration('dummy-2'),
      createCuration(
        'urn:bbc:vivo:curation:23b426a2-6119-4c26-9c6b-b19d468186fd',
      ), // Multimedia
      createCuration('dummy-3'),
      createCuration('urn:bbc:tipo:list:62d1e3f4-b727-4b7f-a351-e1100a2fd4f5'), // Portrait Video
      createCuration('dummy-4'),
    ];
    const result = reorderCurations({ curations, service: 'hindi' });
    expect(result.map(c => c.curationId)).toEqual([
      'top-stories',
      'urn:bbc:tipo:list:62d1e3f4-b727-4b7f-a351-e1100a2fd4f5', // Portrait Video
      'urn:bbc:tipo:list:2323cbdf-5d76-425c-94e0-fe743831ce17', // TV Bulletin
      'urn:bbc:vivo:curation:23b426a2-6119-4c26-9c6b-b19d468186fd', // Multimedia
      'dummy-1',
      'dummy-2',
      'dummy-3',
      'dummy-4',
    ]);
    // check positions are all put back in order
    expect(result.map(c => c.position)).toEqual(
      Array.from({ length: result.length }, (_, i) => i),
    );
  });

  it('reorders selected AV curations for tamil after top stories, keeping other curations in original order', () => {
    const curations = [
      createCuration('top-stories'),
      createCuration('dummy-a'),
      createCuration('urn:bbc:tipo:list:50073dbb-2566-4a70-971a-cf8d18107e52'), // TV Bulletin
      createCuration('dummy-b'),
      createCuration(
        'urn:bbc:vivo:curation:64b206e2-9d17-4059-8d93-7ce00b9331fe',
      ), // Videos
      createCuration('dummy-c'),
      createCuration('urn:bbc:tipo:list:cb7738b2-5316-4afe-9ec0-d8a133485704'), // Portrait Video
      createCuration('dummy-d'),
    ];
    const result = reorderCurations({ curations, service: 'tamil' });
    expect(result.map(c => c.curationId)).toEqual([
      'top-stories',
      'urn:bbc:tipo:list:cb7738b2-5316-4afe-9ec0-d8a133485704', // Portrait Video
      'urn:bbc:tipo:list:50073dbb-2566-4a70-971a-cf8d18107e52', // TV Bulletin
      'urn:bbc:vivo:curation:64b206e2-9d17-4059-8d93-7ce00b9331fe', // Videos
      'dummy-a',
      'dummy-b',
      'dummy-c',
      'dummy-d',
    ]);
    expect(result.map(c => c.position)).toEqual(
      Array.from({ length: result.length }, (_, i) => i),
    );
  });

  it('handles billboard as first curation while reordering other curations', () => {
    const curations = [
      createCuration('billboard', {
        visualStyle: 'BANNER',
        visualProminence: 'MAXIMUM',
      }),
      createCuration('top-stories'),
      createCuration('dummy-1'),
      createCuration(
        'urn:bbc:vivo:curation:23b426a2-6119-4c26-9c6b-b19d468186fd',
      ),
      createCuration('dummy-2'),
      createCuration('urn:bbc:tipo:list:2323cbdf-5d76-425c-94e0-fe743831ce17'),
      createCuration('dummy-3'),
      createCuration('urn:bbc:tipo:list:62d1e3f4-b727-4b7f-a351-e1100a2fd4f5'),
      createCuration('dummy-4'),
    ];
    const result = reorderCurations({ curations, service: 'hindi' });
    expect(result.map(c => c.curationId)).toEqual([
      'billboard',
      'top-stories',
      'urn:bbc:tipo:list:62d1e3f4-b727-4b7f-a351-e1100a2fd4f5',
      'urn:bbc:tipo:list:2323cbdf-5d76-425c-94e0-fe743831ce17',
      'urn:bbc:vivo:curation:23b426a2-6119-4c26-9c6b-b19d468186fd',
      'dummy-1',
      'dummy-2',
      'dummy-3',
      'dummy-4',
    ]);
    expect(result.map(c => c.position)).toEqual(
      Array.from({ length: result.length }, (_, i) => i),
    );
  });

  it('does not reorder if none of the curations are those in the adaptive curation order list', () => {
    const curations = [
      createCuration('top-stories'),
      createCuration('banana'),
      createCuration('mr-blobby'),
      createCuration('lava-lamp'),
    ];
    const result = reorderCurations({ curations, service: 'hindi' });
    expect(result.map(c => c.position)).toEqual(
      Array.from({ length: result.length }, (_, i) => i),
    );
  });
});
