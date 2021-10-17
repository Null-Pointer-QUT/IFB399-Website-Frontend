import * as React from 'react'

const DigestDate = ({ date }: { date: string }) => {
  return (
    <div className='px-4 py-2 border w-full'>
      <div className="font-bold text-2xl text-gray-700">{date}</div>
    </div>
  )
}
export default DigestDate
