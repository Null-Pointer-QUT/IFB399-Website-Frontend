import { useEffect, useState } from 'react'
import { getFileSearchResultList, getSearchResultList } from '../service/commonApi'

const UseGetSearchResultList = (keyword: string | null = '', isSearchFile: boolean = false) => {
  const [list, setList] = useState<any>(null)
  const [err, setErr] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [isFile, setIsFile] = useState(false)
  useEffect(
    () => {
      const fetchData = async () => {
        if (keyword) {
          setLoading(true)
          if (isSearchFile) {
            const { success, data, msg } = await getFileSearchResultList({ keyword })
            if (success) {
              setList(data)
              setIsFile(true)
            } else {
              setErr(msg)
            }
            setLoading(false)
          } else {
            const { success, data, msg } = await getSearchResultList({ keyword })
            if (success) {
              setList(data)
              setIsFile(false)
            } else {
              setErr(msg)
            }
            setLoading(false)
          }
        }else {
          setList([])
        }
      }
      fetchData()
    }, [keyword, isSearchFile])
  return [list, isFile, loading, err]
}
export default UseGetSearchResultList
