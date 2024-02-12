import { Component, Input} from '@angular/core';

@Component({
  selector: 'loading-section',
  templateUrl: 'loading.component.html',
  styleUrls: ['loading.component.css']
})
export class LoadingComponent {
  @Input() isLoading: boolean = false;
}


