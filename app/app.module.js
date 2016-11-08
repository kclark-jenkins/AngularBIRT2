"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
const core_1 = require('@angular/core');
const platform_browser_1 = require('@angular/platform-browser');
const app_component_1 = require('./app.component');
const birtHeader_component_1 = require("./birtHeader.component");
const birtContent_component_1 = require("./birtContent.component");
const birtFooter_component_1 = require("./birtFooter.component");
const birtSocial_component_1 = require("./birtSocial.component");
const birtNavItems_component_1 = require("./birtNavItems.component");
const birtNavBranding_component_1 = require("./birtNavBranding.component");
const openDialog_component_1 = require("./openDialog.component");
const ng2_modal_1 = require("ng2-modal");
const birtOpenDialog_component_1 = require("./birtOpenDialog.component");
let AppModule = class AppModule {
};
AppModule = __decorate([
    core_1.NgModule({
        imports: [platform_browser_1.BrowserModule, ng2_modal_1.ModalModule],
        declarations: [app_component_1.AppComponent,
            birtHeader_component_1.BirtHeaderComponent,
            birtContent_component_1.BirtContentComponent,
            birtFooter_component_1.BirtFooterComponent,
            birtSocial_component_1.BirtSocialComponent,
            birtNavItems_component_1.BirtNavItemsComponent,
            birtNavBranding_component_1.BirtNavBrandingComponent,
            openDialog_component_1.DialogComponent,
            birtOpenDialog_component_1.BirtOpenDialogComponent,
        ],
        entryComponents: [openDialog_component_1.DialogComponent],
        bootstrap: [app_component_1.AppComponent]
    }), 
    __metadata('design:paramtypes', [])
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map