import * as React from 'react'
import EmptyAttachment from '../empty/EmptyAttachment'
import { increaseDownload } from '../../service/commonApi'

const AttachmentsSection = ({ attachments, articleId }: { attachments: string[], articleId: string }) => {
  const handleDownload = () => {
    increaseDownload({ articleId })
  }
  return (
    <div className='w-full space-y-1 md:space-y-3'>
      <div className='flex space-x-4 items-center'>
        <div className='text-xl font-bold'>Attachments:</div>
        {/*<div>*/}
        {/*  <Link className='underline text-blue-500' to='#'>*/}
        {/*    Download all*/}
        {/*  </Link>*/}
        {/*</div>*/}
      </div>
      {attachments?.length ? (
        <table className='table-fixed bg-gray-100 order-collapse border border-gray-300 shadow w-full'>
          <thead>
          <tr className='bg-brand-light px-2'>
            <th className='w-1/2 border'>Name</th>
            <th className='w-1/6 border'>Type</th>
            {/*<th className='w-1/6 border'>Download</th>*/}
            <th className='w-1/3 border'>Download</th>
          </tr>
          </thead>
          <tbody>
          {attachments.map((attachment) => {
            const arr = attachment.split('/')
            const filename = arr[arr.length - 1]
            const arr_ = filename.split('_')
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const [time, ...rest] = arr_
            const name = rest.join()
            const type = name.split('.').slice(-1)[0]
            return (
              <tr key={filename} className='text-center'>
                <td className='px-2 border mx-auto'>{name}</td>
                <td className='px-2 border mx-auto'>{type}</td>
                <td className='px-2 border mx-auto'>
                  <a className='underline text-blue-500'
                     href={attachment}
                     download={attachment}
                     onClick={handleDownload}
                  >Download</a>
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
export default AttachmentsSection
