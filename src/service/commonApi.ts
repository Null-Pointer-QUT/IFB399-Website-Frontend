import request from './request'
import { commonUrl } from './url'

export const userLogin = async (username: string, password: string) => {
  const requestData = { key: username, password }
  let res = await request.post(
    commonUrl.login,
    requestData,
  )
  if (res?.data?.code === 200) {
    const data = res.data.data
    return { success: true, data, msg: null }
  } else {
    const msg = res?.data?.msg || 'Network Error!'
    return { success: false, data: null, msg }
  }
}

export const userSignUp = async (username: string, email: string, password: string) => {
  const requestData = {
    id: 0,
    name: username,
    email,
    password,
  }
  let res = await request.post(
    commonUrl.signup,
    requestData,
  )
  if (res?.data?.code === 200) {
    return { success: true, msg: null }
  } else {
    const msg = res?.data?.msg || 'Network Error!'
    return { success: false, msg }
  }
}

export const userLogout = async () => {
  let res = await request.post(
    commonUrl.logout,
  )
  if (res?.data?.code === 200) {
    return { success: true, msg: null }
  } else {
    const msg = res?.data?.msg || 'Network Error!'
    return { success: false, msg }
  }
}

interface uploadArticleProps {
  title: string
  content: string
  isPublish: boolean
  videoUrl?: string[]
  indexImage?: string
  topImage?: string
  attachments?: string[]
  tags?: string[]
}

export const uploadArticle = async (data: uploadArticleProps) => {
  let res = await request.post(
    commonUrl.uploadArticle,
    data,
  )
  if (res?.data?.code === 200) {
    return { success: true, msg: null }
  } else {
    const msg = res?.data?.msg || 'Network Error!'
    return { success: false, msg }
  }
}

interface getArticleListProps {
  tag?: string
}

export const getArticleList = async (params: getArticleListProps) => {
  let res = await request.get(
    commonUrl.getArticleList,
    { params },
  )
  if (res?.data?.code === 200) {
    return { success: true, msg: null, data: res.data.data }
  } else {
    const msg = res?.data?.msg || 'Network Error!'
    return { success: false, data: null, msg }
  }
}

export const getSearchResultList = async (params: { keyword: string }) => {
  let res = await request.get(
    commonUrl.getSearchResultList,
    { params },
  )
  if (res?.data?.code === 200) {
    return { success: true, msg: null, data: res.data.data }
  } else {
    const msg = res?.data?.msg
    return { success: false, data: null, msg }
  }
}
export const getFileSearchResultList = async (params: { keyword: string }) => {
  let res = await request.get(
    commonUrl.getFileSearchResultList,
    { params },
  )
  if (res?.data?.code === 200) {
    return { success: true, msg: null, data: res.data.data }
  } else {
    const msg = res?.data?.msg
    return { success: false, data: null, msg }
  }
}


export const doThumbUp = async (params: { articleId: string }) => {
  let res = await request.get(
    commonUrl.doThumbUp,
    { params },
  )
  if (res?.data?.code === 200) {
    return { success: true, isThumbUp: res.data.data }
  } else {
    return { success: false, isThumbUp: null }
  }
}

export const getArticleDetail = async (params: { articleId: string }) => {
  let res = await request.get(
    commonUrl.getArticleDetail,
    { params },
  )
  if (res?.data?.code === 200) {
    return { success: true, data: res.data.data }
  } else {
    const msg = res?.data?.msg || 'Network Error!'
    return { success: false, data: null, msg }
  }
}

export const addComment = async (params: { articleId: string, parentId: string | number, comment: string }) => {
  let res = await request.post(
    commonUrl.addComment,
    params,
  )
  if (res?.data?.code === 200) {
    return { success: true, data: res.data.data, msg: null }
  } else {
    const msg = res?.data?.msg || 'Network Error!'
    return { success: false, msg }
  }
}

export const getLikedArticleList = async () => {
  let res = await request.get(
    commonUrl.getLikedArticleList,
  )
  if (res?.data?.code === 200) {
    return { success: true, msg: null, data: res.data.data }
  } else {
    const msg = res?.data?.msg || 'Network Error!'
    return { success: false, data: null, msg }
  }
}

export const getMyArticleList = async (params: { isPublish?: boolean }) => {
  let res = await request.get(
    commonUrl.getMyArticleList,
    { params },
  )
  if (res?.data?.code === 200) {
    return { success: true, msg: null, data: res.data.data }
  } else {
    const msg = res?.data?.msg || 'Network Error!'
    return { success: false, data: null, msg }
  }
}

export const getUserInfo = async () => {
  if (localStorage.getItem('isLogin') !== 'true') {
    const msg = 'Login required'
    return { success: false, data: null, msg }
  } else {
    let res = await request.get(
      commonUrl.getUserInfo,
    )
    if (res?.data?.code === 200) {
      return { success: true, msg: null, data: res.data.data }
    } else {
      const msg = res?.data?.msg || 'Network Error!'
      return { success: false, data: null, msg }
    }
  }
}

export const changeUserInfo = async (params: { key: string, value: string }) => {
  let res = await request.post(
    commonUrl.changeUserInfo,
    params,
  )
  if (res?.data?.code === 200) {
    return { success: true, msg: null, data: res.data.data }
  } else {
    const msg = res?.data?.msg || 'Network Error!'
    return { success: false, data: null, msg }
  }
}

export const increaseDownload = async (params: { articleId: string }) => {
  let res = await request.get(
    commonUrl.increaseDownload,
    { params },
  )
  if (res?.data?.code === 200) {
    return { success: true, msg: null }
  } else {
    const msg = res?.data.msg
    return { success: false, msg }
  }
}

export const changePublicationStatus = async (params: { articleId: string }) => {
  let res = await request.get(
    commonUrl.changePublicationStatus,
    { params },
  )
  if (res?.data?.code === 200) {
    return { success: true, msg: null }
  } else {
    const msg = res?.data?.msg || 'Network Error!'
    return { success: false, msg }
  }
}

export const exploreTopic = async (params: { topicId: string }) => {
  let res = await request.get(
    commonUrl.exploreTopic,
    { params },
  )
  if (res?.data?.code === 200) {
    return { success: true, msg: null, data: res.data.data }
  } else {
    const msg = res?.data?.msg || 'Network Error!'
    return { success: false, msg }
  }
}

export const getPublicTopicList = async () => {
  let res = await request.get(
    commonUrl.getPublicTopicList,
  )
  if (res?.data?.code === 200) {
    return { success: true, msg: null, data: res.data.data }
  } else {
    const msg = res?.data?.msg || 'Network Error!'
    return { success: false, msg }
  }
}

export const subscribeTropic = async (params: { topicId: string }) => {
  let res = await request.get(
    commonUrl.subscribeTropic,
    { params },
  )
  if (res?.data?.code === 200) {
    return { success: true, msg: null }
  } else {
    const msg = res?.data?.msg || 'Network Error!'
    return { success: false, msg }
  }
}

export interface UploadFeedbackParams {
  firstName: string
  lastName: string
  email: string
  phone: string
  subject: string
  message: string
}

export const uploadFeedBack = async (params: UploadFeedbackParams) => {
  let res = await request.post(
    commonUrl.uploadFeedBack,
    params,
  )
  if (res?.data?.code === 200) {
    return { success: true, msg: null, data: res.data.data }
  } else {
    const msg = res?.data?.msg || 'Network Error!'
    return { success: false, data: null, msg }
  }
}

export const deleteArticle = async (params: { articleId: string }) => {
  let res = await request.post(
    commonUrl.deleteArticle,
    params,
  )
  if (res?.data?.code === 200) {
    return { success: true, msg: null }
  } else {
    const msg = res?.data?.msg || 'Network Error!'
    return { success: false, msg }
  }
}

interface updateAllArticleDetailProps {
  articleId: string
  title: string
  content: string
  isPublish: boolean
  videoUrl?: string[]
  indexImage?: string
  topImage?: string
  attachments?: string[]
  tags?: string[]
}

export const updateAllArticleDetail = async (data: updateAllArticleDetailProps) => {
  let res = await request.post(
    commonUrl.updateAllArticleDetail,
    data,
  )
  if (res?.data?.code === 200) {
    return { success: true, msg: null }
  } else {
    const msg = res?.data?.msg || 'Network Error!'
    return { success: false, msg }
  }
}

export const updateArticle = async (params: { articleId: string, key: 'title' | 'topImage' | 'indexImage' | 'content', value: string }) => {
  let res = await request.post(
    commonUrl.updateArticle,
    params,
  )
  if (res?.data?.code === 200) {
    return { success: true, msg: null }
  } else {
    const msg = res?.data?.msg || 'Network Error!'
    return { success: false, msg }
  }
}

export const updateArticleList = async (params: { articleId: string, key: 'videoUrl' | 'attachments' | 'tags', value: string[] }) => {
  let res = await request.post(
    commonUrl.updateArticleDetailList,
    params,
  )
  if (res?.data?.code === 200) {
    return { success: true, msg: null }
  } else {
    const msg = res?.data?.msg || 'Network Error!'
    return { success: false, msg }
  }
}

export const oauth = async (params: { url: string }) => {
  let res = await request.get(
    commonUrl.oauthCallback + params.url,
  )
  if (res?.data?.code === 200) {
    const data = res.data.data
    return { success: true, data, msg: null }
  } else {
    const msg = res?.data?.msg || 'Network Error!'
    return { success: false, data: null, msg }
  }
}


export const getAllMsg = async () => {
  let res = await request.get(
    commonUrl.getAllMsg,
  )
  if (res?.data?.code === 200) {
    const data = res.data.data
    return { success: true, data, msg: null }
  } else {
    const msg = res?.data?.msg || 'Network Error!'
    return { success: false, data: null, msg }
  }
}


export const readMsg = async (params: { messageId: string[] }) => {
  let res = await request.post(
    commonUrl.readMsg,
    params.messageId,
  )
  if (res?.data?.code === 200) {
    return { success: true, msg: null }
  } else {
    const msg = res?.data?.msg || 'Network Error!'
    return { success: false, msg }
  }
}

export const getMsgNum = async () => {
  let res = await request.get(
    commonUrl.getMsgNum,
  )
  if (res?.data?.code === 200) {
    const data = res.data.data
    return { success: true, data, msg: null }
  } else {
    const msg = res?.data?.msg || 'Network Error!'
    return { success: false, data: null, msg }
  }
}

export const getDigest = async () => {
  let res = await request.get(
    commonUrl.getDigest,
  )
  if (res?.data?.code === 200) {
    const data = res.data.data
    return { success: true, data, msg: null }
  } else {
    const msg = res?.data?.msg || 'Network Error!'
    return { success: false, data: null, msg }
  }
}
