import * as React from 'react'

const youtube_parser = (url: string): boolean | string => {
  let regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/
  let match = url.match(regExp)
  return (match && match[7].length === 11) ? match[7] : false
}

const YoutubeEmbed = ({ embedId }: { embedId: string }) => {
  let id: string
  if (embedId.length === 11) {
    id = embedId as string
  } else {
    id = youtube_parser(embedId) as string
  }
  return (
    <div className='w-full h-60 md:h-96 lg:h-120'>
      <iframe
        width='100%'
        height='100%'
        src={`https://www.youtube.com/embed/${id}`}
        frameBorder='0'
        allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
        allowFullScreen
        title='Embedded youtube'
      />
    </div>
  )
}
export default YoutubeEmbed
