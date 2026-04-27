let S3Client;
let GetObjectCommand;
let PutObjectCommand;
let DeleteObjectsCommand;
let DeleteObjectCommand;

try {
  ({
    S3Client,
    GetObjectCommand,
    PutObjectCommand,
    DeleteObjectsCommand,
    DeleteObjectCommand,
  } = require('@aws-sdk/client-s3'));
} catch (_error) {
  S3Client = null;
}

const cache = new Map();
const serviceKeyIndex = new Map();

const ARTICLE_SERVICE_REGEX = /\/([a-z0-9-]+)\/articles\//i;

const cacheBackend = (process.env.SIMORGH_ISR_CACHE_BACKEND || 'memory').trim();
const cacheBucket = process.env.SIMORGH_ISR_CACHE_BUCKET;
const cachePrefix = (
  process.env.SIMORGH_ISR_CACHE_PREFIX || 'nextjs-isr'
).trim();
const awsRegion = process.env.AWS_REGION || 'eu-west-1';

const isS3BackendEnabled =
  cacheBackend === 's3' && Boolean(cacheBucket && cachePrefix && S3Client);

const s3Client = isS3BackendEnabled
  ? new S3Client({ region: awsRegion })
  : null;

const streamToString = async stream => {
  const chunks = [];

  for await (const chunk of stream) {
    chunks.push(Buffer.from(chunk));
  }

  return Buffer.concat(chunks).toString('utf-8');
};

const keyToStorageId = key => Buffer.from(key).toString('base64url');

const buildCacheObjectKey = key =>
  `${cachePrefix}/entries/${keyToStorageId(key)}.json`;

const buildServiceIndexKey = service =>
  `${cachePrefix}/service-index/${service}.json`;

const getServiceIndexFromMemory = service => {
  const keys = serviceKeyIndex.get(service);

  if (!keys) {
    return [];
  }

  return [...keys];
};

const putServiceIndex = async service => {
  if (!isS3BackendEnabled) {
    return;
  }

  const keys = getServiceIndexFromMemory(service);

  await s3Client.send(
    new PutObjectCommand({
      Bucket: cacheBucket,
      Key: buildServiceIndexKey(service),
      Body: JSON.stringify({ keys }),
      ContentType: 'application/json',
    }),
  );
};

const getServiceIndex = async service => {
  if (!isS3BackendEnabled) {
    return getServiceIndexFromMemory(service);
  }

  try {
    const response = await s3Client.send(
      new GetObjectCommand({
        Bucket: cacheBucket,
        Key: buildServiceIndexKey(service),
      }),
    );

    const body = await streamToString(response.Body);
    const payload = JSON.parse(body);

    if (!Array.isArray(payload.keys)) {
      return [];
    }

    return payload.keys;
  } catch (_error) {
    return [];
  }
};

const removeKeyFromIndexes = key => {
  serviceKeyIndex.forEach((keys, service) => {
    if (!keys.has(key)) {
      return;
    }

    keys.delete(key);

    if (keys.size === 0) {
      serviceKeyIndex.delete(service);
    }
  });
};

const addServiceKey = (service, key) => {
  if (!service) {
    return;
  }

  const existing = serviceKeyIndex.get(service);

  if (existing) {
    existing.add(key);
    return;
  }

  serviceKeyIndex.set(service, new Set([key]));
};

const getServiceFromCacheKey = key => {
  if (!key || typeof key !== 'string') {
    return null;
  }

  const match = key.match(ARTICLE_SERVICE_REGEX);

  return match?.[1] || null;
};

const invalidateServiceArticleCache = async service => {
  const inMemoryKeys = serviceKeyIndex.get(service);
  const storedKeys = await getServiceIndex(service);
  const keys = new Set([...(inMemoryKeys || []), ...storedKeys]);

  if (!keys || keys.size === 0) {
    return {
      service,
      invalidatedEntries: 0,
    };
  }

  let invalidatedEntries = 0;

  keys.forEach(key => {
    if (cache.delete(key)) {
      invalidatedEntries += 1;
    }
    removeKeyFromIndexes(key);
  });

  if (isS3BackendEnabled) {
    const objects = [...keys].map(key => ({
      Key: buildCacheObjectKey(key),
    }));

    if (objects.length > 0) {
      await s3Client.send(
        new DeleteObjectsCommand({
          Bucket: cacheBucket,
          Delete: {
            Objects: objects,
            Quiet: true,
          },
        }),
      );
    }

    await s3Client.send(
      new DeleteObjectCommand({
        Bucket: cacheBucket,
        Key: buildServiceIndexKey(service),
      }),
    );
  }

  return {
    service,
    invalidatedEntries,
  };
};

class CacheHandler {
  constructor(options) {
    this.options = options;
  }

  async get(key) {
    const inMemoryEntry = cache.get(key);

    if (inMemoryEntry) {
      return inMemoryEntry;
    }

    if (!isS3BackendEnabled) {
      return null;
    }

    try {
      const response = await s3Client.send(
        new GetObjectCommand({
          Bucket: cacheBucket,
          Key: buildCacheObjectKey(key),
        }),
      );

      const body = await streamToString(response.Body);
      const entry = JSON.parse(body);

      cache.set(key, entry);

      const service = getServiceFromCacheKey(key);
      addServiceKey(service, key);

      return entry;
    } catch (_error) {
      return null;
    }
  }

  async set(key, data, ctx) {
    const entry = {
      value: data,
      lastModified: Date.now(),
      tags: ctx?.tags,
    };

    cache.set(key, entry);

    const service = getServiceFromCacheKey(key);
    addServiceKey(service, key);

    if (!isS3BackendEnabled) {
      return;
    }

    await s3Client.send(
      new PutObjectCommand({
        Bucket: cacheBucket,
        Key: buildCacheObjectKey(key),
        Body: JSON.stringify(entry),
        ContentType: 'application/json',
      }),
    );

    await putServiceIndex(service);
  }

  async revalidateTag(tags) {
    const tagList = [tags].flat();

    for (const [key, value] of cache) {
      const matchingTag = value?.tags?.some(tag => tagList.includes(tag));

      if (!matchingTag) {
        continue;
      }

      cache.delete(key);
      removeKeyFromIndexes(key);
    }
  }

  resetRequestCache() {}
}

module.exports = CacheHandler;
module.exports.invalidateServiceArticleCache = invalidateServiceArticleCache;
