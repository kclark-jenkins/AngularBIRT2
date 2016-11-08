import { Injectable } from '@angular/core';
import { Property } from './property';
import { BIRTPROPERTIES } from './birt';

@Injectable()
export class BirtService {
    getProperties(): Property {
        return BIRTPROPERTIES;
    }

    constructor() {
        console.log('BirtService constructor');
        
        var props = this.getProperties();

        try {
            actuate.load('viewer');
            actuate.load('parameter');
            actuate.load('reportexplorer');
            actuate.load('dialog');

            this.req = new actuate.RequestOptions( );
            actuate.initialize( props.ihub, props.reqOps, props.username, props.password, function(){});

        }catch(err){
            console.log(err);
        }
    };

    loadBirtModules = function() {

    };
    test = function() {

    };

    openDialog = function(pane) {
        var explorer = new actuate.ReportExplorer(pane);
        explorer.registerEventHandler( actuate.reportexplorer.
            EventConstants.ON_SELECTION_CHANGED, function(selected_item, path_name){
            if(path_name != null) {
                $('#openReportName').val(path_name);
            }else{
            }
        } );
        explorer.setFolderName( "/" );
        var resultDef =
            "Name|FileType|Version|VersionName|Description";
        explorer.setResultDef( resultDef.split("|") );
        explorer.submit(function(){});
    };

    saveDialog = function(pane) {
        var explorer = new actuate.ReportExplorer(pane);
        explorer.registerEventHandler( actuate.reportexplorer.
            EventConstants.ON_SELECTION_CHANGED, function(selected_item, path_name){
            if(path_name != null) {
                $('#saveReportName').val(path_name);
            }else{
            }
        } );
        explorer.setFolderName( "/" );
        var resultDef =
            "Name|FileType|Version|VersionName|Description";
        explorer.setResultDef( resultDef.split("|") );
        explorer.submit();
    };

    openReport = function(dlg, pane, reportName) {
        console.log(dlg);
        console.log(pane);

        try {
            var reqOps = new actuate.RequestOptions();
            reqOps.setRepositoryType('Enterprise');
            reqOps.setVolume('Default Volume');
            reqOps.setCustomParameters({});

            var viewer1 = new actuate.Viewer(pane);
            viewer1.setReportDesign($('#openReportName').val());
            var options = new actuate.viewer.UIOptions();
            viewer1.setUIOptions(options);
            console.log('starting');
            $('.designMessage').hide();
            viewer1.submit(function() {
            });
            dlg.close();
        }catch(err){
            console.log(err);
        }
    }

    saveReport = function(dlg) {
        alert($('#saveReportName').val());
        dlg.close();
    }

    parametersDialog = function() {
        console.log('Parameters Dialog');
    }

    filtersDialog = function() {
        console.log('Filters Dialog');
    };

    helpDialog = function() {
        console.log('Help Dialog');
    }
};