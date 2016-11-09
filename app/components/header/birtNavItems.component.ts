import {Component, Input, OnInit} from '@angular/core';
import { BirtService } from '../../services/birt/birt.service';
import {BirtOpenDialogComponent} from "./birtOpenDialog.compoent";

declare var jsapi: any;

@Component({
    selector: 'birt-nav-items',
    templateUrl: 'templates/html/birtNavItems.tmpl.html',
    styleUrls: ['templates/css/report-explorer.tmpl.css'],
    providers: [BirtService]
})
export class BirtNavItemsComponent implements OnInit {
    jsapiObj: any;

    constructor(private birtService: BirtService) { }

    ngOnInit(): void {
    }

    tester(): void {
        //var t = new BirtOpenDialogComponent();
        //t.open();
    }

    openExplorer(pane): void {
        this.birtService.openDialog(pane);
    }

    openReport(dlg, pane): void {
        //this.birtService.openReport(dlg, pane);
    }

    saveReport(dlg): void {
        this.birtService.saveReport(dlg);
    }

    saveExplorer(pane): void {
        this.birtService.saveDialog(pane);
    }

    openParameters(dlg, pane): void {
        this.birtService.openParameters(dlg, pane);
    }

    runWithParameters(dlg, pane): void {
        this.birtService.runWithParameters(dlg, pane);
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