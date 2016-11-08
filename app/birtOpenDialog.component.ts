import {Component, Input, AfterViewInit, AfterViewChecked, ContentChild, OnInit} from '@angular/core';
import {ModalModule} from "ng2-modal";

@Component({
    selector: 'birt-open-dialog',
    templateUrl: 'templates/birtOpenDialog.tmpl.html'
})
export class BirtOpenDialogComponent implements  OnInit, AfterViewChecked, AfterViewInit {
    ngOnInit(): void {
        console.log('init');
    }

    ngAfterViewChecked(): void {
        console.log('After view checked');
    }

    ngAfterViewInit(): void {
        console.log('After view init');
    }
}