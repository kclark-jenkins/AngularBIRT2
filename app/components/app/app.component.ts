import {Component, ViewContainerRef} from '@angular/core';
import { BirtHeaderComponent } from '../header/birtHeader.component.ts';


@Component({
    selector: 'my-app',
    templateUrl: 'templates/html/index.tmpl.html'
})
export class AppComponent {
    private viewContainerRef: ViewContainerRef;

    public constructor(viewContainerRef:ViewContainerRef) {
        // You need this small hack in order to catch application root view container ref
        this.viewContainerRef = viewContainerRef;
    }
}
