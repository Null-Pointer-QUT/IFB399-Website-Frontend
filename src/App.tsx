import * as React from 'react'
import { useReducer } from 'react'
import { BrowserRouter as Router, Switch } from 'react-router-dom'

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


function App() {
  const [userInfo, userInfoDispatcher] = useReducer(userInfoReducer, userInitialState)
  const [modelController, modelControllerDispatcher] = useReducer(modelReducer, modelInitialState)
  const [message, messageDispatcher] = useReducer(messageReducer, messageInitialState)

  //update userinfo
  useUpdateUserInfo(userInfoDispatcher)

  useNewMessage(userInfo.userId, messageDispatcher)

  return (
    <ModelContext.Provider value={{ state: modelController, dispatch: modelControllerDispatcher }}>
      <Router>
        <Switch>
          <UserInfoContext.Provider value={{ state: userInfo, dispatch: userInfoDispatcher }}>
            <MessageContext.Provider value={{ state: message, dispatch: messageDispatcher }}>
              <RouterGuard />
            </MessageContext.Provider>
          </UserInfoContext.Provider>
        </Switch>
      </Router>
      <ModalPortal />
    </ModelContext.Provider>
  )
}

export default App
