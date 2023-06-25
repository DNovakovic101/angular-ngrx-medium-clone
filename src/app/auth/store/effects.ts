import {Actions, createEffect, ofType} from '@ngrx/effects'
import {AuthService} from '../services/auth.service'
import {inject} from '@angular/core'
import {authActions} from './actions'
import {map, switchMap, of, catchError, tap} from 'rxjs'
import {HttpErrorResponse} from '@angular/common/http'
import {CurrentUserInterface} from 'src/app/shared/types/currentUser.interface'
import {PersistanceService} from 'src/app/shared/services/persistance.service'
import {Router} from '@angular/router'

export const registerEffect = createEffect(
  (
    actions$ = inject(Actions),
    authService = inject(AuthService),
    persistanceService = inject(PersistanceService)
  ) => {
    return actions$.pipe(
      ofType(authActions.register),
      switchMap(({request}) => {
        return authService.register(request).pipe(
          map((currentUser: CurrentUserInterface) => {
            persistanceService.set('accessToken', currentUser.token)
            return authActions.registerSucess({currentUser})
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(
              authActions.registerFailure({
                errors: errorResponse.error.errors,
              })
            )
          })
        )
      })
    )
  },
  {functional: true}
)

export const redirectAfterRegisterEffect = createEffect(
  (actions$ = inject(Actions), router = inject(Router)) => {
    return actions$.pipe(
      ofType(authActions.registerSucess),
      tap(() => {
        router.navigateByUrl('/')
      })
    )
  },
  {functional: true, dispatch: false}
)
