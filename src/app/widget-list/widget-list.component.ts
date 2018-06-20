import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {WidgetServiceClient} from '../services/widget.service.client';

@Component({
  selector: 'app-widget-list',
  templateUrl: './widget-list.component.html',
  styleUrls: ['./widget-list.component.css']
})
export class WidgetListComponent implements OnInit {

  constructor(private service: WidgetServiceClient,
              private route: ActivatedRoute) {
    this.route.params.subscribe(params => this.setContext(params));
  }

  context;
  widgets = [];
  orderedListItems = [];
  unorderedListItems = [];

  setContext(params) {
    this.context = params;
    this.loadWidgets(params.topicId);
  }

  loadWidgets(topicId) {
    this.service.findWidgetsForTopic(topicId)
      .then(widgets => this.widgets = widgets)
      .then((widgets) => {
        console.log(widgets);
        if (this.widgets.length > 0) {
          widgets.map(widget => {
            if (widget.widgetType == 'ListWidget') {
              if (widget.listType == 'ordered') {
                this.orderedListItems = widget.listItems.split(' ');
                console.log(this.orderedListItems);
              } else {
                this.unorderedListItems = widget.listItems.split(' ');
                console.log(this.unorderedListItems);
              }
            }
          });
        }
      });
  }

  ngOnInit() {

  }

}
