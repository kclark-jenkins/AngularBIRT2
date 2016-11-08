import {Component, Input, OnInit} from '@angular/core';
import { BirtService } from './birt.service';

declare var jsapi: any;

@Component({
    selector: 'birt-nav-items',
    templateUrl: 'templates/birtNavItems.tmpl.html',
    providers: [BirtService]
})
export class BirtNavItemsComponent implements OnInit {
    jsapiObj: any;

    constructor(private birtService: BirtService) { }

    ngOnInit(): void {
    }

    openExplorer(pane): void {
        this.birtService.openDialog(pane);
    }

    openReport(dlg, pane): void {
        this.birtService.openReport(dlg, pane);
    }

    saveReport(dlg): void {
        this.birtService.saveReport(dlg);
    }

    saveExplorer(pane): void {
        this.birtService.saveDialog(pane);
    }

    open(t): void {
        console.log(document.getElementById('openExplorer'));
        t.open();
    }

    save(t): void {
        t.open();
    }

    filters(t): void {
        t.open();
    }

    parameters(t): void {
        t.open();
    }

    help(t): void {
        t.open();
    }
}