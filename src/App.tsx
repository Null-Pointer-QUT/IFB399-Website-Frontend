import * as React from 'react'
import { useReducer } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import RouterGuard from './router/RouterGuard'
import ModalPortal from './components/portals/ModalPortal'
import { useUpdateUserInfo } from './hooks/useUpdateUserInfo'

import {
  ModelContext,
  reducer as modelReducer,
  initialState as modelInitialState,
} from './context/ModelContext'
import {
  UserInfoContext,
  reducer as userInfoReducer,
  initialState as userInitialState,
} from './context/UserInfoContext'
import {
  MessageContext,
  reducer as messageReducer,
  initialState as messageInitialState,
} from './context/MessageContext'
import { useNewMessage } from './hooks/useNewMessage'
import BaseLayout from './components/layout/BaseLayout'


function App() {
  const [userInfo, userInfoDispatcher] = useReducer(userInfoReducer, userInitialState)
  const [modalController, modalControllerDispatcher] = useReducer(modelReducer, modelInitialState)
  const [message, messageDispatcher] = useReducer(messageReducer, messageInitialState)

  //update userinfo
  useUpdateUserInfo(userInfoDispatcher)

  useNewMessage(userInfo.userId, messageDispatcher)

  return (
    <ModelContext.Provider value={{ state: modalController, dispatch: modalControllerDispatcher }}>
      <UserInfoContext.Provider value={{ state: userInfo, dispatch: userInfoDispatcher }}>
        <MessageContext.Provider value={{ state: message, dispatch: messageDispatcher }}>
          <Router>
            <Switch>
              <Route path='/explore' >
                <BaseLayout>
                  <RouterGuard />
                </BaseLayout>
              </Route>
              <Route >
                <RouterGuard />
              </Route>
            </Switch>
          </Router>
        </MessageContext.Provider>
      </UserInfoContext.Provider>
      <ModalPortal />
    </ModelContext.Provider>
  )
}

export default App
