import { useState, useEffect } from 'react'
import request from '../service/request'

const useFetch = (url: string) => {
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState<boolean | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setLoading(true)
    setData(null)
    setError(null)
    request.get(url)
      .then(res => {
        setLoading(false)
        //checking for multiple responses for more flexibility
        //with the url we send in.
        res.data.content && setData(res.data.content)
      })
      .catch((err) => {
        setLoading(false)
        setError('An error occurred. Awkward..' + err)
      })
  }, [url])

  return { data, loading, error }
}
export default useFetch
