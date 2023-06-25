import {createActionGroup, props} from '@ngrx/store'
import {RegisterRequestInterface} from '../types/registerRequest.interface'
import {BackendErrorsInterface} from 'src/app/shared/types/backendErrors.interface'
import {CurrentUserInterface} from 'src/app/shared/types/currentUser.interface'

export const authActions = createActionGroup({
  source: 'auth',
  events: {
    Register: props<{request: RegisterRequestInterface}>(),
    'Register sucess': props<{currentUser: CurrentUserInterface}>(),
    'Register failure': props<{errors: BackendErrorsInterface}>(),
  },
})

/*export const register = createAction(
  '[Auth] Register',
  props<{request: RegisterRequestInterface}>()
)*/
