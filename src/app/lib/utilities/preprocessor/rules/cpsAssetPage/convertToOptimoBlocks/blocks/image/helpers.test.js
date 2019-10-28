import { getImageParts } from './helpers';

describe('getImageParts', () => {
  it('splits image paths into its parts', () => {
    expect(
      getImageParts('/cpsdevpb/729E/test/_63724392_gettyimages-1098075358.jpg'),
    ).toEqual(['cpsdevpb', '729E/test/_63724392_gettyimages-1098075358.jpg']);
  });

  it('splits image paths into its parts without leading slash', () => {
    expect(
      getImageParts('cpsdevpb/729E/test/_63724392_gettyimages-1098075358.jpg'),
    ).toEqual(['cpsdevpb', '729E/test/_63724392_gettyimages-1098075358.jpg']);
  });
});
