import { useEffect, useState } from 'react'
import { getDigest } from '../service/commonApi'

const UseGetDigest = () => {
  const [list, setList] = useState<any>(null)
  const [err, setErr] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  useEffect(
    () => {
      const fetchData = async () => {
        setLoading(true)
        const { success, data, msg } = await getDigest()
        if (success) {
          setList(data)
        } else {
          setErr(msg)
        }
        setLoading(false)
      }
      fetchData()
    }, [])
  return [list, loading, err]
}
export default UseGetDigest
