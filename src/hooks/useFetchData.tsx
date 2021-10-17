import { useEffect, useState } from 'react'

function UseFetchData<T>(fetchFunction: (p: T) => Promise<{ success: boolean, data?: any, msg?: string }>, props: T, doFetch: boolean) {
  const [res, setRes] = useState<any>(null)
  const [err, setErr] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      const { success, data, msg } = await fetchFunction(props)
      setLoading(false)
      if (success) {
        setRes(data)
      } else {
        setErr(msg)
      }
    }
    doFetch && fetchData()
    // eslint-disable-next-line
  }, [doFetch, fetchFunction])
  return { res, loading, err }
}

export default UseFetchData
