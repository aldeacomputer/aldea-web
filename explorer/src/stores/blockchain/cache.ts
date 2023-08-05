import { LocalStorageLRU } from '@cocalc/local-storage-lru'

export const cache = new LocalStorageLRU({
  recentKey: `__recent_keys`
})

export async function cached<T = unknown>(keys: string | string[], fetchData: (key: string) => Promise<T>): Promise<T> {
  if (typeof keys === 'string') keys = [keys]
  const cacheKey = keys.join('/')
  if (cache.has(cacheKey)) {
    return cache.get(cacheKey) as T
  } else {
    const val = await fetchData(keys[keys.length - 1])
    cache.set(cacheKey, val)
    return val
  }
}
