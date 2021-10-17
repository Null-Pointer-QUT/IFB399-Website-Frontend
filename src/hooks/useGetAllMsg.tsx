import { useEffect, useState } from 'react'
import { getAllMsg } from '../service/commonApi'

const UseGetAllMsg = (currentTab:number) => {
  const [list, setList] = useState<any>(null)
  const [err, setErr] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  useEffect(
    () => {
      const fetchData = async () => {
        setLoading(true)
        const { success, data, msg } = await getAllMsg()
        if (success) {
          setList(data)
        } else {
          setErr(msg)
        }
        setLoading(false)
      }
      fetchData()
    }, [currentTab])
  return [list, loading, err]
}
export default UseGetAllMsg
