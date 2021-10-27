import * as React from 'react'
import { Route, Redirect, useLocation } from 'react-router-dom'

import routes from './routes'


function RouterGuard() {
  const location = useLocation()
  const { pathname, search } = location

  const currentRoute = routes.find((el) => el['path'] === pathname)
  const isLogin = localStorage.getItem('isLogin')

  if (pathname === '/login' || pathname === '/signup') {
    if (isLogin === 'true' && localStorage.getItem('roleId') !== '1') {
      return <Redirect to='/' />
    }
  }

  if (currentRoute) {
    if (currentRoute.path === '/') {
      return <Redirect to='/explore' />
    }
    if (currentRoute.path.indexOf('admin') !== -1 && localStorage.getItem('roleId') !== '1' && pathname.indexOf('login') === -1) {
      return <Redirect to='/admin/login' />
    } else if (currentRoute.requireLogin && isLogin !== 'true') {
      return <Redirect to={`/login?redirect=${pathname}${search || ''}`} />
    } else {
      return <Route path={pathname} component={currentRoute['component']} exact />
    }
  } else {
    return <Redirect to='/404' />
  }
}

export default RouterGuard
