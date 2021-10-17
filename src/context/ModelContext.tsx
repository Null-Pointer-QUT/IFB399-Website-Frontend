import * as React from 'react'
import { emptyConfig, ModalConfig } from '../utils/modalConfig'

export type ModelController = {
  open: boolean
  config: ModalConfig
}

export type Action = {
  type: 'OPEN' | 'CLOSE'
  config?: ModalConfig
}

export type ModelControllerDispatch = React.Dispatch<Action>

export const initialState: ModelController = {
  open: false,
  config: emptyConfig,
}

export function reducer(state: ModelController, action: Action) {
  switch (action.type) {
    case 'OPEN':
      return {
        open: true,
        config: action.config,
      } as ModelController
    case 'CLOSE':
      return { ...state, open: false }
    default:
      throw new Error()
  }
}

export const ModelContext = React.createContext({} as { state: ModelController, dispatch: ModelControllerDispatch })
export const useModelContext = () => React.useContext(ModelContext)
