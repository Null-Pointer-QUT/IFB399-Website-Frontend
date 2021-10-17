import { useEffect, useState } from 'react'
import { getArticleList } from '../service/commonApi'

const UseGetArticleList = (tag: string = '') => {
  const [list, setList] = useState<any>(null)
  const [err, setErr] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  useEffect(
    () => {
      const fetchData = async () => {
        setLoading(true)
        const { success, data, msg } = await getArticleList({ tag })
        if (success) {
          setList(data)
        } else {
          setErr(msg)
        }
        setLoading(false)
      }
      fetchData()
    }, [tag])
  return [list, loading, err]
}
export default UseGetArticleList
