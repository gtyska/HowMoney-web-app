import { Component, OnInit, Renderer2, Inject} from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private renderer: Renderer2, @Inject(DOCUMENT) private document: Document) { }

  ngOnInit(): void {
    let script = this.renderer.createElement('script');
    script.type = `application/ld+json`;
    script.text = `{
            "@context": "h
        }
    `;
    this.renderer.appendChild(this.document.body, script);
  }

}
