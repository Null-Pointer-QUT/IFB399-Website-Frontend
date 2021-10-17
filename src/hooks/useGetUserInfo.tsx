import { useEffect, useState } from 'react'
import { getUserInfo } from '../service/commonApi'

const UseGetUserInfo = () => {
  const [fetchedData, setFetchedData] = useState<any>(null)
  const [err, setErr] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  useEffect(
    () => {
      const fetchData = async () => {
        setLoading(true)
        const { success, data, msg } = await getUserInfo()
        if (success) {
          setFetchedData(data)
          localStorage.setItem('username',data.name)
          localStorage.setItem('userAvatar',data.avatar)
        } else {
          setErr(msg)
        }
        setLoading(false)
      }
      fetchData()
    }, [])
  return [fetchedData, loading, err]
}
export default UseGetUserInfo
