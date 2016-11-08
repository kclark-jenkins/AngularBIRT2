import {Component} from "@angular/core";
import {ModalModule} from "ng2-modal";

@Component({
    selector: 'dlg',
    template: `
<div class="row">
    <button (click)="myModal.open()">open my modal</button>
</div>
        `
})
export class DialogComponent {
}