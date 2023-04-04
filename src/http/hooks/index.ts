import to from 'await-to-js'
import { ref } from 'vue'
export async function useRequest(fn: Promise<any>) {
  const loading = ref(true)
  const [err, res] = await to(fn)
  loading.value = false
  return {
    loading,
    code: 200,
    data: {},
    msg: '',
    successData: {}
  }
}
