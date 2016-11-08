import {
    NgModule
}      from '@angular/core';


import { BrowserModule } from '@angular/platform-browser';
import { AppComponent }   from './app.component';
import {BirtHeaderComponent} from "./birtHeader.component";
import {BirtContentComponent} from "./birtContent.component";
import {BirtFooterComponent} from "./birtFooter.component";
import {BirtSocialComponent} from "./birtSocial.component";
import {BirtNavItemsComponent} from "./birtNavItems.component"
import {BirtNavBrandingComponent} from "./birtNavBranding.component";
import {DialogComponent} from "./openDialog.component";
import {ModalModule} from "ng2-modal";
import {BirtOpenDialogComponent} from "./birtOpenDialog.component";


@NgModule({
    imports:      [ BrowserModule, ModalModule ],
    declarations: [ AppComponent,
                    BirtHeaderComponent,
                    BirtContentComponent,
                    BirtFooterComponent,
                    BirtSocialComponent,
                    BirtNavItemsComponent,
                    BirtNavBrandingComponent,
                    DialogComponent,
                    BirtOpenDialogComponent,
                    ],
    entryComponents: [ DialogComponent ],
    bootstrap:    [ AppComponent ]
})

export class AppModule {
}
