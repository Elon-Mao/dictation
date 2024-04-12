import {
  showNotify
} from 'vant'
import { useSystemStore } from '@/stores/system'

function timeoutPromise(ms: number) {
  return new Promise((_resolve, reject) => {
    setTimeout(() => {
      reject(new Error('Timeout'));
    }, ms);
  });
}

export default async (promise: Promise<any>) => {
  const systemStore = useSystemStore()
  systemStore.setLoading(true)
  try {
    await Promise.race([
      promise,
      timeoutPromise(64000)
    ])
  } catch (error) {
    if (error instanceof Error) {
      showNotify(error.message)
    }
    throw error
  } finally {
    systemStore.setLoading(false)
  }
}