import {ChangeDetectionStrategy, Component} from '@angular/core'
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms'
import {Store} from '@ngrx/store'
import {RegisterRequestInterface} from '../../types/registerRequest.interface'
import {RouterLink} from '@angular/router'
import {AsyncPipe, NgIf} from '@angular/common'
import {selectIsSubmitting, selectValidationErrors} from '../../store/reducers'
import {authActions} from '../../store/actions'
import {combineLatest} from 'rxjs'
import {BackendErrorMessagesComponent} from 'src/app/shared/components/backend-error-messages/backend-error-messages.component'

@Component({
  selector: 'mc-register',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink,
    AsyncPipe,
    NgIf,
    BackendErrorMessagesComponent,
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterComponent {
  form = this.fb.nonNullable.group({
    username: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required],
  })
  data$ = combineLatest({
    isSubmitting: this.store.select(selectIsSubmitting),
    backednErrors: this.store.select(selectValidationErrors),
  })

  constructor(private fb: FormBuilder, private store: Store) {}

  onSubmit() {
    const request: RegisterRequestInterface = {
      user: this.form.getRawValue(),
    }
    this.store.dispatch(authActions.register({request}))
  }
}
