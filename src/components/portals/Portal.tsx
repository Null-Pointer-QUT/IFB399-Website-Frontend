import { createPortal } from 'react-dom'
import usePortal from '../../hooks/usePortal'

/**
 * @example
 * <Portal id="modal">
 *   <p>Thinking with portals</p>
 * </Portal>
 */
// @ts-ignore
const Portal = ({ id, children }) => {
  const target = usePortal(id)
  // @ts-ignore
  return createPortal(children, target)
}

export default Portal
