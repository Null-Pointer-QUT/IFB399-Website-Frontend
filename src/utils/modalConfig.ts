export interface ModalConfig {
  title: string
  body: string
  type: 'Success' | 'Warning' | 'Error' | ''
  showCancel?: boolean
}

export const emptyConfig: ModalConfig = {
  title: '',
  body: '',
  type: '',
}

export const notLoginConfig: ModalConfig = {
  title: 'Login Required',
  body: 'Please login first.',
  type: 'Warning',
}
export const passwordIncorrectConfig: ModalConfig = {
  title: 'Incorrect Password',
  body: 'Please check your username & password.',
  type: 'Error',
}
export const inputIncorrectConfig: ModalConfig = {
  title: 'Incorrect Input',
  body: 'Please check your input.',
  type: 'Error',
}
export const inputEmptyConfig: ModalConfig = {
  title: 'Got empty Input',
  body: 'Please check your inputs',
  type: 'Warning',
}

export const passwordMismatchConfig: ModalConfig = {
  title: 'Password Mismatch',
  body: 'Please check your password & confirm password.',
  type: 'Warning',
}

export const uploadSuccessConfig: ModalConfig = {
  title: 'Successfully created article!',
  body: 'You can go back to view your published articles',
  type: 'Success',
}
export const upDateSuccessConfig: ModalConfig = {
  title: 'Successfully update article!',
  body: 'You can go back to view your published articles',
  type: 'Success',
}

export const uploadErrorConfig: ModalConfig = {
  title: 'Error Occurred!',
  body: '',
  type: 'Error',
}

export const uploadFeedbackSuccessConfig: ModalConfig = {
  title: 'Upload Feedback Success!',
  body: 'We will contact you in a few days.',
  type: 'Success',
}
