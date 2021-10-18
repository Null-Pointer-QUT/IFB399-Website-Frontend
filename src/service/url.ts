export const minioUrl = 'https://minio.juntao.life/ifb399/test'
export const wsMsgUrl = 'wss://ifb399.juntao.life:443/ws/sp-portal/notification'
export const previewerUrl = 'http://preview.juntao.life/onlinePreview'

export const adminUrl = {
  adminLogin: '/sp-admin/AccAdmin/doLogin',
  collectTopic: '/sp-portal/topic/manage/collectTopic',
  getAllTopicList: '/sp-portal/topic/manage/getAllTopics',
  changeTopicPubStatus: '/sp-portal/topic/manage/changeIsPublic',
  changeTopicDetail: '/sp-portal/topic/manage/changeTopicDetails',
}

export const commonUrl = {
  login: '/sp-portal/AccUser/doLogin',
  signup: '/sp-portal/user/signUp',
  logout: '/sp-portal/AccUser/doExit',
  uploadArticle: '/sp-portal/article/uploadArticle',
  getSearchResultList: '/sp-portal/article/search',
  getFileSearchResultList: '/sp-portal/attachment/search',
  getArticleList: '/sp-portal/article/getArticleList',
  getLikedArticleList: '/sp-portal/article/getLikedArticleList',
  getMyArticleList: '/sp-portal/article/getMyArticleList',
  getArticleDetail: '/sp-portal/article/getArticleDetail',
  addComment: '/sp-portal/article/addComment',
  doThumbUp: '/sp-portal/article/thumbUp',
  getUserInfo: '/sp-portal/user/getUserInfo',
  changeUserInfo: '/sp-portal/user/changeInfo',
  increaseDownload: '/sp-portal/article/incDownload',
  changePublicationStatus: '/sp-portal/article/changePublicationStatus',
  exploreTopic: '/sp-portal/topic/explore',
  getPublicTopicList: '/sp-portal/topic/getPublicTopics',
  subscribeTropic: '/sp-portal/topic/subscribe',
  uploadFeedBack: '/sp-portal/feedback/upload',
  deleteArticle: '/sp-portal/article/deleteArticle',
  updateArticle: '/sp-portal/article/updateArticleDetail',
  updateArticleDetailList: '/sp-portal/article/updateArticleDetailList',
  updateAllArticleDetail: '/sp-portal/article/updateArticleAllDetail',
  oauthCallback: '/sp-portal/oauth/callback',
  getAllMsg: '/sp-portal/notify/getAllMsg',
  readMsg: '/sp-portal/notify/readList',
  getMsgNum: '/sp-portal/notify/getNrOfUnreadMsg',
  getDigest: '/sp-portal/digest/getDigest',
}

export const imgUrl = {
  largeLogo: minioUrl + '/np_full.png',
  smallLogo: minioUrl + '/np_logo.png',
  defaultAvatar: minioUrl + '/blank_avatar.png',
  bgLogin: minioUrl + '/bg_login.jpg',
  adminLoginBackground: minioUrl + '/bg_admin_login.jpg',
  image_404: minioUrl + '/image_404',
}
