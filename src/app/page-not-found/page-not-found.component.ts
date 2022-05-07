import { Component, OnInit, OnDestroy, Inject, ViewEncapsulation} from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss']
})
export class PageNotFoundComponent implements OnInit, OnDestroy {
  constructor(@Inject(DOCUMENT) private document: Document ) { }

  ngOnInit(): void {
    this.document.body.classList.add('body-404-bg-color');
  }

  ngOnDestroy() {
    this.document.body.classList.remove('body-404-bg-color');
  }


}
