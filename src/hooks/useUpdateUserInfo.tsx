import { useEffect, useState } from 'react'

import { getUserInfo } from '../service/commonApi'
import { UserInfoDispatch } from '../context/UserInfoContext'

export const useUpdateUserInfo = (userInfoDispatcher: UserInfoDispatch) => {
  const [done, SetDone] = useState(false)
  useEffect(() => {
    const isLogin = localStorage.getItem('isLogin')
    const tokenValue = localStorage.getItem('tokenValue')
    const tokenName = localStorage.getItem('tokenName')

    const fetch = async () => {
      if (isLogin && tokenName && tokenValue) {
        const { success, data } = await getUserInfo()
        if (success) {
          userInfoDispatcher({ type: 'LOAD' })
          userInfoDispatcher({
            type: 'UPDATE',
            data: { username: data.name, userAvatar: data.avatar, userEmail: data.email },
          })
        } else {
          userInfoDispatcher({ type: 'CLEAR' })
        }
      } else {
        userInfoDispatcher({ type: 'CLEAR' })
      }
      SetDone(true)
    }
    fetch()
    // eslint-disable-next-line
  }, [])
  return done
}
