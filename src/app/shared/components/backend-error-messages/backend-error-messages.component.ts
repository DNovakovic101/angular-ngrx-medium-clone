import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core'
import {BackendErrorsInterface} from '../../types/backendErrors.interface'
import {NgFor} from '@angular/common'

@Component({
  selector: 'mc-backend-error-messages',
  standalone: true,
  imports: [NgFor],
  templateUrl: './backend-error-messages.component.html',
  styleUrls: ['./backend-error-messages.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BackendErrorMessagesComponent implements OnInit {
  @Input({required: true}) backendErrors: BackendErrorsInterface = {}

  errorMessages: string[] = []

  ngOnInit(): void {
    this.errorMessages = Object.keys(this.backendErrors).map((name: string) => {
      const messages = this.backendErrors[name].join(' ')
      return `${name} ${messages}`
    })
  }
}
