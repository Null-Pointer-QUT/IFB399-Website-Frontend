import * as React from 'react'
import { setLocalStorage } from '../utils/utils'

export type UserInfo = {
  isLogin?: 'true'
  userId?: string
  tokenName?: string
  tokenValue?: string
  roleId?: string
  username?: string
  userEmail?: string
  userAvatar?: string
}

export type Action = {
  type: 'UPDATE' | 'CLEAR' | 'LOAD' | 'UPDATE_WITH_FETCHED_DATA'
  data?: UserInfo | any
}

export type UserInfoDispatch = React.Dispatch<Action>

export const initialState: UserInfo = {
  isLogin: undefined,
  userId: undefined,
  tokenName: undefined,
  tokenValue: undefined,
  roleId: undefined,
  username: undefined,
  userEmail: undefined,
  userAvatar: undefined,
}

export function reducer(state: UserInfo, action: Action) {
  switch (action.type) {
    case 'LOAD':
      return {
        isLogin: localStorage.getItem('isLogin'),
        userId: localStorage.getItem('userId'),
        tokenName: localStorage.getItem('tokenName'),
        tokenValue: localStorage.getItem('tokenValue'),
        roleId: localStorage.getItem('roleId'),
        username: localStorage.getItem('username'),
        userEmail: localStorage.getItem('userEmail'),
        userAvatar: localStorage.getItem('userAvatar'),
      }
    case 'UPDATE':
      setLocalStorage(action.data)
      return { ...state, ...action.data }
    case 'CLEAR':
      localStorage.removeItem('isLogin')
      localStorage.removeItem('userId')
      localStorage.removeItem('tokenName')
      localStorage.removeItem('tokenValue')
      localStorage.removeItem('roleId')
      localStorage.removeItem('username')
      localStorage.removeItem('userEmail')
      localStorage.removeItem('userAvatar')
      return initialState
    case 'UPDATE_WITH_FETCHED_DATA':
      const userdata = {
        isLogin: 'true',
        userId: action.data.user.id,
        tokenName: action.data.tokenInfo.tokenName,
        tokenValue: action.data.tokenInfo.tokenValue,
        roleId: action.data.user.roleId,
        username: action.data.user.name,
        userEmail: action.data.user.email,
        userAvatar: action.data.user.avatar,
      }
      setLocalStorage(userdata)
      return { ...state, ...userdata }
    default:
      throw new Error()
  }
}

export const UserInfoContext = React.createContext({} as { state: UserInfo, dispatch: UserInfoDispatch })
export const useUserInfoContext = () => React.useContext(UserInfoContext)
