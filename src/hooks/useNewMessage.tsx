import { useEffect } from 'react'
import { wsMsgUrl } from '../service/url'
import { getMsgNum } from '../service/commonApi'

export const useNewMessage = (userid: string, messageDispatcher: Function) => {
  useEffect(() => {
      const fetchData = async () => {
        if(userid){
          const { success, data } = await getMsgNum()
          if (success) {
            if (data > 0) {
              messageDispatcher({ type: 'RECEIVE_NEW_MESSAGE' })
            }
          }
        }
      }
      fetchData()
    }, [userid,messageDispatcher],
  )
  useEffect(() => {
    if (userid) {
      const wsUrl = wsMsgUrl + '/' + userid
      try {
        const socket = new WebSocket(wsUrl)
        socket?.addEventListener('message', (ev) => {
          // console.log(JSON.parse(ev.data))
          messageDispatcher({ type: 'RECEIVE_NEW_MESSAGE' })
        })
      } catch (e) {
        console.log(e)
      }
    }
  }, [userid, messageDispatcher])
}
