import { LocalStorageLRU } from '@cocalc/local-storage-lru'

const PREFIX = '$a'

export const cache = new LocalStorageLRU()

export async function cached<T = unknown>(keys: string | string[], fetchData: (key: string) => Promise<T>): Promise<T> {
  if (typeof keys === 'string') keys = [keys]
  keys.unshift(PREFIX)
  const cacheKey = keys.join('/')
  if (cache.has(cacheKey)) {
    return cache.get(cacheKey) as T
  } else {
    const val = await fetchData(keys[keys.length - 1])
    cache.set(cacheKey, val)
    return val
  }
}
