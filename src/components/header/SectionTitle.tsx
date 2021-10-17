import * as React from 'react'

const SectionTitle = ({
  title,
  description,
}: {
  title: string
  description: string
}) => {
  return (
    <div className='border rounded-md bg-white mx-2 flex flex-col items-center p-1 space-y-1 pt-2 mb-2 md:p-3 md:p-6 md:space-y-3 '>
      <div className='text-2xl font-bold md:text-3xl'>{title}</div>
      <div>{description} </div>
    </div>
  )
}
export default SectionTitle
