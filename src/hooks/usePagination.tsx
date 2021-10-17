import * as React from 'react'

function usePagination<T>(longList: T[], pageSize: number = 10) {
  const [list, setList] = React.useState<T[]>([])
  const [currentPage, setCurrentPage] = React.useState(1)
  const pageNum = longList?.length ? Math.ceil(longList.length / pageSize) : 1
  const goToNextPage = () => {
    if (currentPage < pageNum) {
      setCurrentPage(val => val + 1)
    }
  }

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(val => val - 1)
    }
  }
  const goToPage = (page: number) => {
    if (page >= 1 && page <= pageNum) {
      setCurrentPage(page)

    }
  }

  React.useEffect(() => {
    if (longList) {
      setList([...longList].slice((currentPage - 1) * pageSize, currentPage * pageSize))
    }
  }, [longList, currentPage, pageSize])
  return { list, currentPage, goToNextPage, goToPreviousPage, goToPage }
}

export default usePagination
