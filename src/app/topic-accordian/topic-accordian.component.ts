import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';

@Component({
  selector: 'app-topic-accordian',
  templateUrl: './topic-accordian.component.html',
  styleUrls: ['./topic-accordian.component.css']
})
export class TopicAccordianComponent implements OnInit {

  constructor(private route: ActivatedRoute, private _sanitizer: DomSanitizer) {
    this.route.params.subscribe(params => this.setParams(params));
  }

  public get htmlProperty(): SafeHtml {
    return this._sanitizer.bypassSecurityTrustHtml('<div class="container mt-4">\n' +
      '  <div class="accordion" id="topicListing">\n' +
      '    <div *ngFor="let topic of topics; let i = index" class="card">\n' +
      '      <div class="card-header" id="{{\'heading\'+i}}">\n' +
      '        <h5 class="mb-0">\n' +
      '          <button class="btn btn-link" type="button" data-toggle="collapse" data-target="{{\'#\'+i}}"\n' +
      '                  aria-expanded="true" aria-controls="collapseOne">\n' +
      '            {{topic.title}}\n' +
      '          </button>\n' +
      '        </h5>\n' +
      '      </div>\n' +
      '\n' +
      '      <div id="{{i}}" class="collapse show" aria-labelledby="{{\'heading\'+i}}" data-parent="#topicListing">\n' +
      '        <div class="card-body">\n' +
      '          <p>This is some widget</p>\n' +
      '          <app-widget-list></app-widget-list>\n' +
      '        </div>\n' +
      '      </div>\n' +
      '    </div>\n' +
      '  </div>\n' +
      '</div>');
  }

  topicId;
  topics = [];
  widgets = [];

  setParams(params) {
    this.topicId = params['topicId'];
  }

  ngOnInit() {
    return this.htmlProperty;
  }

}
