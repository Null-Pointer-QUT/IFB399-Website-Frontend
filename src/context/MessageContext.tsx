import * as React from 'react'

export type Message = {
  num: number
}

export type Action = {
  type: 'RECEIVE_NEW_MESSAGE' | 'READ_MESSAGE'
}

export type MessageDispatch = React.Dispatch<Action>

export const initialState: Message = {
  num: 0,
}

export function reducer(state: Message, action: Action) {
  switch (action.type) {
    case 'RECEIVE_NEW_MESSAGE':
      return { ...state, num: state.num + 1 }
    case 'READ_MESSAGE':
      return { ...state, num: 0 }
    default:
      throw new Error()
  }
}

export const MessageContext = React.createContext({} as { state: Message, dispatch: MessageDispatch })
export const useMessageContext = () => React.useContext(MessageContext)
