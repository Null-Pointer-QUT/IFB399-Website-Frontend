import { useEffect, useState } from 'react'
import { getLikedArticleList } from '../service/commonApi'

const UseLikedArticleList = () => {
  const [list, setList] = useState<any>(null)
  const [err, setErr] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  useEffect(
    () => {
      const fetchData = async () => {
        setLoading(true)
        const { success, data, msg } = await getLikedArticleList()
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
export default UseLikedArticleList
