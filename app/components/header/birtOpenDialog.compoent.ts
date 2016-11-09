import {Component, Input, EventEmitter} from '@angular/core';

@Component({
    selector: 'birt-open-dialog',
    template: `
    <div class="dialog">
        <header><div class="title">Dialog box</div><div class="exit-button" (click)="onClickedExit()">x</div></header>
        <p>{{message}}</p>
    </div>
    `,
    styles: [`
        .dialog {
            width: 250px;
            position: absolute;
            border: 1px solid black;
            border-radius: 5px;
            overflow: hidden;
            position: fixed;
            left: calc(50% - 125px);
            top: 100px;
        }
        .dialog p {
            text-align: center;
        }
        .dialog header {
            border-bottom: 1px solid black;
            font-size: 12px;
            padding: 5px;
            display: flex;
        }
        .dialog header .title {
            flex-grow: 1;
            cursor: default;
        }
        .dialog header .exit-button {
            cursor: pointer;
            padding: 0 5px;
        }
    `]
})
export class BirtOpenDialogComponent {
    close = new EventEmitter();
    message: string = "Hello, I'm a dialog box!";

    onClickedExit() {
        this.close.emit('event');
    }
}