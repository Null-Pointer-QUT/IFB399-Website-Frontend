import request from './request'
import { adminUrl } from './url'

export const adminLogin = async (username: string, password: string) => {
  const formData = new FormData()
  formData.append('key', username)
  formData.append('password', password)
  let res = await request.post(adminUrl.adminLogin,
    formData, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    },
  )
  if (res.data.code === 200) {
    const data = res.data.data
    localStorage.setItem('isLogin', 'true')
    localStorage.setItem('tokenName', data.tokenInfo.tokenName)
    localStorage.setItem('tokenValue', data.tokenInfo.tokenValue)
    localStorage.setItem('roleId', data.admin.id)
    return { success: true }
  } else {
    localStorage.setItem('isLogin', 'false')
    localStorage.setItem('tokenName', '')
    localStorage.setItem('tokenValue', '')
    localStorage.setItem('roleId', '')
    return { success: false }
  }
}

export const getAllTopicList = async () => {
  let res = await request.get(
    adminUrl.getAllTopicList,
  )
  if (res?.data?.code === 200) {
    return { success: true, msg: null, data: res.data.data }
  } else {
    const msg = res.data.msg
    return { success: false, msg }
  }
}

export const changeTopicPubStatus = async (params: { topicId: string }) => {
  let res = await request.get(
    adminUrl.changeTopicPubStatus,
    { params },
  )
  if (res?.data?.code === 200) {
    return { success: true, msg: null }
  } else {
    const msg = res.data.msg
    return { success: false, msg }
  }
}
export const changeTopicDetail = async (params: { topicId: string, key: string, value: string }) => {
  let res = await request.post(
    adminUrl.changeTopicDetail,
    params,
  )
  if (res?.data?.code === 200) {
    return { success: true, msg: null, data: res.data.data }
  } else {
    const msg = res ? res.data.msg : 'Networked error'
    return { success: false, data: null, msg }
  }
}
