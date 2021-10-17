import { useEffect, useState } from 'react'
import { getArticleDetail } from '../service/commonApi'

const UseGetArticleDetail = (articleId: string) => {
  const [fetchedData, setFetchedData] = useState<any>(null)
  const [err, setErr] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  useEffect(
    () => {
      const fetchData = async () => {
        setLoading(true)
        const { success, data, msg } = await getArticleDetail({ articleId })
        if (success) {
          setFetchedData(data)
        } else {
          setErr(msg)
        }
        setLoading(false)
      }
      fetchData()
    }, [articleId])
  return [fetchedData, loading, err]
}
export default UseGetArticleDetail
