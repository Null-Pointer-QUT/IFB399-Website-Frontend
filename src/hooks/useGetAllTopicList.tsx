import { useEffect, useState } from 'react'
import { getAllTopicList } from '../service/adminApi'

const UseAllTopicList = () => {
  const [list, setList] = useState<any>(null)
  const [err, setErr] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  useEffect(
    () => {
      const fetchData = async () => {
        setLoading(true)
        const { success, data, msg } = await getAllTopicList()
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
export default UseAllTopicList
