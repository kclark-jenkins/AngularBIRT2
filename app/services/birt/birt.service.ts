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
            actuate.load('parameter');

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

    getParameters = function(dlg, pane, paramPane) {
        console.log('getParameters');
        window.birtParameters = new actuate.Parameter(paramPane);

        window.birtParameters.setReportName(window.reportDesign);
        window.birtParameters.submit(function() {
            // TODO: Do this the angular way
            //console.log(birtParameters);
            var paramDef = window.birtParameters._._paramImpl._paramDefs;

            for(var i=0;i<paramDef.length;i++) {
                if(paramDef[i]._._isRequired == true && paramDef[i]._._isHidden == false) {
                    $('.reportExplorerControls').fadeOut('slow', function() {
                        $('#openDialogTitle').html('Report Parameters');
                        $('.reportExplorerParameters').fadeIn('slow', function(){});
                    });
                }
            }

            var reqOps = new actuate.RequestOptions();
            reqOps.setRepositoryType('Enterprise');
            reqOps.setVolume('Default Volume');
            reqOps.setCustomParameters({});

            var viewer1 = new actuate.Viewer(pane);
            viewer1.setReportDesign(window.reportDesign);
            var options = new actuate.viewer.UIOptions();
            viewer1.setUIOptions(options);
            if($('.designMessage').is(":visible")) {
                $('.designMessage').fadeOut('slow', function() {
                    $('#' + pane).fadeIn('slow', function(){});
                })
            }
            viewer1.submit(function() {
                //dlg.close();
            });
            //this.runReport(pane, window.reportName, null);
            //dlg.close();
        });
    }

    openDialogRunParameters = function(pane, dlg) {
        console.log('openDialogRunParameters');
        console.log('what');
        var executor = this.runReport;
        window.birtParameters.downloadParameterValues(function(pvalues) {
            var reqOps = new actuate.RequestOptions();
            reqOps.setRepositoryType('Enterprise');
            reqOps.setVolume('Default Volume');
            reqOps.setCustomParameters({});

            var viewer1 = new actuate.Viewer(pane);
            viewer1.setReportDesign(window.reportDesign);
            var options = new actuate.viewer.UIOptions();
            viewer1.setUIOptions(options);
            viewer1.setParameterValues(pvalues);
            if($('.designMessage').is(":visible")) {
                $('.designMessage').fadeOut('slow', function() {
                    $('#' + pane).fadeIn('slow', function(){});
                })
            }
            viewer1.submit(function() {
                //dlg.close();
            });
        });
    }

    openParameters = function(dlg, pane) {
        var birtParameters = new actuate.Parameter(pane);

        birtParameters.setReportName(window.reportDesign);
        birtParameters.submit(function() {
            // TODO: Do this the angular way
            window.params = birtParameters;
        });
    }

    runWithParameters = function(dlg, pane) {
        console.log('runWithParameters');//*******
        this.getParameters(dlg, pane, 'birtParameters')
        //this.openDialogRunParameters(pane, dlg);
    }

    openDialog = function(pane) {
        var explorer = new actuate.ReportExplorer(pane);
        explorer.registerEventHandler( actuate.reportexplorer.
            EventConstants.ON_SELECTION_CHANGED, function(selected_item, path_name){
            if(path_name != null) {
                // TODO: Do this the angular way
                window.reportDesign = path_name;
                $('#openReportName').val(window.reportDesign);
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
                // TODO: Do this the angular way
                window.reportDesign = path_name;
                $('#saveReportName').val(window.reportDesign);
            }else{
            }
        } );
        explorer.setFolderName( "/" );
        var resultDef =
            "Name|FileType|Version|VersionName|Description";
        explorer.setResultDef( resultDef.split("|") );
        explorer.submit();
    };

    runReport = function(pane, reportName, parameters) {
        try {
            var reqOps = new actuate.RequestOptions();
            reqOps.setRepositoryType('Enterprise');
            reqOps.setVolume('Default Volume');
            reqOps.setCustomParameters({});

            var viewer1 = new actuate.Viewer(pane);
            viewer1.setReportDesign(window.reportDesign);
            var options = new actuate.viewer.UIOptions();
            viewer1.setUIOptions(options);
            viewer1.setParameterValues(parameters);
            viewer1.submit(function() {
            });
        }catch(err){
            console.log(err);
        }
    }

    openReport = function(dlg, pane, paramPane) {
        console.log('openReport');
        this.getParameters(dlg, pane, paramPane);

        //this.runReport(pane, window.reportDesign, null);
        //$('.designMessage').hide();
        //dlg.close();
    }

    saveReport = function(dlg) {
        //alert($('#saveReportName').val());
        //dlg.close();
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