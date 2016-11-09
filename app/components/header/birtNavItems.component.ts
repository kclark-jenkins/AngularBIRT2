import {Component, Input, OnInit} from '@angular/core';
import { BirtService } from '../../services/birt/birt.service';
import {BirtOpenDialogComponent} from "./birtOpenDialog.compoent";

declare var jsapi: any;

@Component({
    selector: 'birt-nav-items',
    templateUrl: 'templates/html/birtNavItems.tmpl.html',
    styleUrls:  ['templates/css/report-explorer.tmpl.css',
                 'templates/css/reportExplorerParameters.tmpl.css',
                 'templates/css/navigation.tmpl.css'],
    providers: [BirtService]
})
export class BirtNavItemsComponent implements OnInit {
    jsapiObj: any;

    constructor(private birtService: BirtService) { }

    ngOnInit(): void {
    }

    tester(pane, dialog, callback): void {
        var checkExist = setInterval(function() {
            if ($('#'+pane).length) {
                clearInterval(checkExist);
                callback(dialog);
            }
        }, 100); // check every 100ms
    }

    openExplorer(pane): void {
        $('#openDialogTitle').html('Select a report design');
        $('.reportExplorerControls').show();
        $('.reportExplorerParameters').hide();

        this.tester(pane, this.birtService, function(dialog) {
            dialog.openDialog(pane);
        });
    }

    openReport(dlg, pane, paramPane): void {
        this.birtService.openReport(dlg, pane, paramPane);
    }

    openDialogRunParams(pane, dlg): void {
        this.birtService.openDialogRunParameters(pane, dlg);
    }

    swapViewerParams(): void {
        if($('.reportExplorerParameters').is(":visible")){
            $('.reportExplorerParameters').fadeOut('slow', function() {
                $('#openDialogTitle').html('Select a location for your design');
                $('.reportExplorerControls').fadeIn('slow', function(){});
            });
        }else{
            $('.reportExplorerControls').fadeOut('slow', function() {
                $('#openDialogTitle').html('Report Parameters');
                $('.reportExplorerParameters').fadeIn('slow', function(){});
            });
        }
    }

    saveReport(dlg): void {
        this.birtService.saveReport(dlg);
    }

    saveExplorer(pane): void {
        this.tester(pane, this.birtService, function(dialog) {
            dialog.saveDialog(pane);
        });

    }

    openParameters(dlg, pane): void {
        this.tester(pane, this.birtService, function(dialog) {
            dialog.openParameters(dlg, pane);
        });
    }

    runWithParameters(dlg, pane): void {
        $('#openDialogTitle').html('Report Parameters');
        $('.reportExplorerControls').hide();
        $('.reportExplorerParameters').show();
        dlg.open();

    }

    open(t): void {
        //console.log(document.getElementById('openExplorer'));
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