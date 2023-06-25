import {bootstrapApplication} from '@angular/platform-browser'
import {AppComponent} from './app/app.component'
import {appRoutes} from './app/app.routes'
import {provideRouter} from '@angular/router'
import {provideState, provideStore} from '@ngrx/store'
import {provideStoreDevtools} from '@ngrx/store-devtools'
import {isDevMode} from '@angular/core'
import {authFeatureKey, authReducer} from './app/auth/store/reducers'
import {provideHttpClient} from '@angular/common/http'
import * as authEffects from './app/auth/store/effects'
import {provideEffects} from '@ngrx/effects'

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    provideRouter(appRoutes),
    provideStore(),
    provideState(authFeatureKey, authReducer),
    provideEffects(authEffects),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: !isDevMode(),
      autoPause: true,
      trace: false,
      traceLimit: 75,
    }),
  ],
})
