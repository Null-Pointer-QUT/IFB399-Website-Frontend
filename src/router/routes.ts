import Login from '../pages/user/Login'
import NotFound from '../pages/error/404'
import Home from '../pages/home/Home'
import Explore from '../pages/explore/Explore'
import Detail from '../pages/explore/Detail'
import Subscription from '../pages/explore/Subscription'
import Digest from '../pages/explore/Digest'
import Upload from '../pages/upload/Upload'
import Admin from '../pages/admin/Admin'
import AdminLogin from '../pages/admin/AdminLogin'
import Signup from '../pages/user/Signup'
import Profile from '../pages/user/Profile'
import Search from '../pages/explore/Search'
import Liked from '../pages/explore/Liked'
import FeedBack from '../pages/user/FeedBack'
import MyArticle from '../pages/upload/MyArticle'
import MyDrafts from '../pages/upload/MyDrafts'
import Articles from '../pages/admin/Articles'
import Topics from '../pages/admin/Topics'
import EditUpload from '../pages/upload/EditArticle'
import Notification from '../pages/user/Notification'
import Subscribed from '../pages/explore/Subscribed'

interface routeConfig {
  path: string
  requireLogin: boolean
  component: any
}

const routes: routeConfig[] = [
  {
    path: '/',
    requireLogin: false,
    component: Explore,
  },
  {
    path: '/home',
    requireLogin: false,
    component: Home,
  }, {
    path: '/login',
    component: Login,
    requireLogin: false,
  },
  {
    path: '/signup',
    requireLogin: false,
    component: Signup,
  },
  {
    path: '/404',
    requireLogin: false,
    component: NotFound,
  },
  {
    path: '/explore',
    requireLogin: false,
    component: Explore,
  },
  {
    path: '/explore/detail',
    requireLogin: false,
    component: Detail,
  },
  {
    path: '/explore/subscription',
    requireLogin: false,
    component: Subscription,
  },
  {
    path: '/explore/subscribed',
    requireLogin: true,
    component: Subscribed,
  },
  {
    path: '/explore/digest',
    requireLogin: true,
    component: Digest,
  },
  {
    path: '/explore/search',
    requireLogin: false,
    component: Search,
  },
  {
    path: '/explore/upload',
    requireLogin: true,
    component: Upload,
  },
  {
    path: '/explore/admin',
    requireLogin: true,
    component: Admin,
  },
  {
    path: '/admin/login',
    requireLogin: false,
    component: AdminLogin,
  },
  {
    path: '/explore/my_profile',
    requireLogin: true,
    component: Profile,
  },
  {
    path: '/explore/liked',
    requireLogin: true,
    component: Liked,
  },
  {
    path: '/explore/feedback',
    requireLogin: false,
    component: FeedBack,
  },
  {
    path: '/explore/my_articles',
    requireLogin: true,
    component: MyArticle,
  },
  {
    path: '/explore/my_drafts',
    requireLogin: true,
    component: MyDrafts,
  },
  {
    path: '/explore/edit_article',
    requireLogin: true,
    component: EditUpload,
  },
  {
    path: '/explore/notification',
    requireLogin: true,
    component: Notification,
  },
  {
    path: '/admin/articles',
    requireLogin: true,
    component: Articles,
  },
  {
    path: '/admin/topics',
    requireLogin: true,
    component: Topics,
  },
]
export default routes
