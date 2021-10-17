import * as React from 'react'

import Portal from './Portal'
import SimpleModel from '../models/SimpleModel'

const ModalPortal = () => {
  return (
    <Portal id='modal'>
      <SimpleModel />
    </Portal>
  )
}

export default ModalPortal
