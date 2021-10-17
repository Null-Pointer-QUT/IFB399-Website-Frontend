import { useEffect, useState } from 'react'
import { getMyArticleList } from '../service/commonApi'

const UseMydArticleList = (isPublish?: boolean) => {
  const [list, setList] = useState<any>(null)
  const [err, setErr] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  useEffect(
    () => {
      const fetchData = async () => {
        setLoading(true)
        const { success, data, msg } = await getMyArticleList({ isPublish })
        if (success) {
          setList(data)
        } else {
          setErr(msg)
        }
        setLoading(false)
      }
      fetchData()
    }, [isPublish])
  return [list, loading, err]
}
export default UseMydArticleList
