import {Component} from '@angular/core'
import {AsyncPipe, NgIf} from '@angular/common'
import {Store} from '@ngrx/store'
import {selectCurrentUser} from 'src/app/auth/store/reducers'
import {combineLatest} from 'rxjs'
import {RouterModule} from '@angular/router'

@Component({
  selector: 'mc-top-bar',
  standalone: true,
  imports: [NgIf, RouterModule, AsyncPipe],
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css'],
})
export class TopBarComponent {
  data$ = combineLatest({
    currentUser: this.store.select(selectCurrentUser),
  })

  constructor(private store: Store) {}
}
