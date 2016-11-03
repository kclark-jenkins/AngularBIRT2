import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent }   from './app.component';
import {BirtHeaderComponent} from "./birtHeader.component";
import {BirtContentComponent} from "./birtContent.component";
import {BirtFooterComponent} from "./birtFooter.component";
import {BirtSocialComponent} from "./birtSocial.component";


@NgModule({
    imports:      [ BrowserModule ],
    declarations: [ AppComponent, BirtHeaderComponent, BirtContentComponent, BirtFooterComponent, BirtSocialComponent ],
    bootstrap:    [ AppComponent ]
})
export class AppModule { }
