import {
    NgModule
}      from '@angular/core';


import { BrowserModule } from '@angular/platform-browser';
import { AppComponent }   from '../../components/app/app.component';
import {ModalModule} from "ng2-modal";
import {BirtOpenDialogComponent} from "../../components/header/birtOpenDialog.component";
import {BirtHeaderComponent} from "../../components/header/birtHeader.component";
import {BirtContentComponent} from "../../components/content/birtContent.component";
import {BirtFooterComponent} from "../../components/footer/birtFooter.component";
import {BirtSocialComponent} from "../../components/social/birtSocial.component";
import {BirtNavItemsComponent} from "../../components/header/birtNavItems.component";
import {BirtNavBrandingComponent} from "../../components/header/birtNavBranding.component";


@NgModule({
    imports:      [ BrowserModule, ModalModule ],
    declarations: [ AppComponent,
                    BirtHeaderComponent,
                    BirtContentComponent,
                    BirtFooterComponent,
                    BirtSocialComponent,
                    BirtNavItemsComponent,
                    BirtNavBrandingComponent,
                    BirtOpenDialogComponent,
                    ],
    entryComponents: [  ],
    bootstrap:    [ AppComponent ]
})

export class AppModule {

}
