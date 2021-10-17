import * as React from 'react'
import EmptyAttachment from '../empty/EmptyAttachment'

const EditPageAttachmentsSection = ({ attachments, onDel }: { attachments: string[], onDel: Function }) => {
  return (
    <div className='w-full space-y-1 md:space-y-3'>
      <div className='flex space-x-4 items-center'>
        <div className='text-xl font-bold'>Original Attachments:</div>
      </div>
      {attachments?.length ? (
        <table className='table-fixed bg-gray-100 order-collapse border border-gray-300 shadow w-full'>
          <thead>
          <tr className='bg-brand-light px-2'>
            <th className='w-1/2 border'>Name</th>
            <th className='w-1/6 border'>Type</th>
            <th className='w-1/3 border'>Delete</th>
          </tr>
          </thead>
          <tbody>
          {attachments.map((attachment, index) => {
            const arr = attachment.split('/')
            const filename = arr[arr.length - 1]
            const arr_ = filename.split('_')
            // eslint-disable-next-line
            const [time, ...rest] = arr_
            const name = rest.join()
            const type = name.split('.').slice(-1)[0]
            return (
              <tr key={filename} className='text-center'>
                <td className='px-2 border mx-auto'>{name}</td>
                <td className='px-2 border mx-auto'>{type}</td>
                <td className='px-2 border mx-auto'>
                  <button
                    className='underline text-blue-500'
                    onClick={() => {
                      onDel(index)
                    }}
                  >Delete
                  </button>
                </td>
              </tr>
            )
          })}
          </tbody>
        </table>) : (
        <EmptyAttachment />
      )}

    </div>
  )
}
export default EditPageAttachmentsSection
