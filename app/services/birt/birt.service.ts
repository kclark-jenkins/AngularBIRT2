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
        this.getProperties().actInitModules();
        this.getProperties().actInit(this.getProperties().ihub,
            this.getProperties().reqOps,
            this.getProperties().username,
            this.getProperties().password,
            function() {
                console.log('done loading');

            });
    };

    getParameters = function(dlg, pane, paramPane) {
        console.log('getParameters');
        var birtProps = this.getProperties();

        if(this.getProperties().birtParameters == null) {
            birtProps.birtParameters = new actuate.Parameter(birtProps.paramDiv);
        }

        birtProps.birtParameters.setReportName(window.actReportDesign);
        birtProps.birtParameters.submit(function() {
            var paramDef = birtProps.birtParameters._._paramImpl._paramDefs;

            for(var i=0;i<paramDef.length;i++) {
                if(paramDef[i]._._isRequired == true && paramDef[i]._._isHidden == false) {
                    $('.reportExplorerControls').fadeOut('slow', function() {
                        $('.reportExplorerParameters').fadeIn('slow', function(){});
                    });
                }
            }

            birtProps.reqOps.setRepositoryType('Enterprise');
            birtProps.reqOps.setVolume('Default Volume');
            birtProps.reqOps.setCustomParameters({});

            birtProps.actViewer = new actuate.Viewer(birtProps.actViewerContainer);
            birtProps.actViewer.setReportDesign(window.actReportDesign);

            birtProps.actViewer.setUIOptions(birtProps.actOptions);
            if($('.designMessage').is(":visible")) {
                $('.designMessage').fadeOut('slow', function() {
                    $('#' + pane).fadeIn('slow', function(){});
                })
            }
            birtProps.actViewer.submit(function() {
                //dlg.close();
            });
        });
    }

    openDialogRunParameters = function(pane, dlg) {
        console.log('openDialogRunParameters');
        console.log('what');

        var executor = this.runReport;
        var birtProperties = this.getProperties();

        this.getProperties().birtParameters.setReportName(window.actReportDesign);
        this.getProperties().birtParameters.downloadParameterValues(function(pvalues) {
            console.log(pvalues);
            birtProperties.actViewer.setParameterValues(pvalues);
            birtProperties.actViewer.submit(function(){
            });
        });
    }

    openParameters = function(dlg, pane) {
        if(this.getProperties().birtParameters == null) {
            this.getProperties().birtParameters = new actuate.Parameter(pane);
        }

        this.getProperties().birtParameters.setReportName(this.getProperties().actReportDesign);
        this.getProperties().birtParameters.submit(function() {
            window.params = birtParameters;
        });
    }

    runWithParameters = function(dlg, pane) {
        console.log('runWithParameters');//*******
        this.getParameters(dlg, pane, 'birtParameters')
        //this.openDialogRunParameters(pane, dlg);
    }

    openDialog = function(pane) {
        if(this.getProperties().actExplorer == null) {
            this.getProperties().actExplorer = new actuate.ReportExplorer(pane);
        }

        var birtProperties = this.getProperties();
        this.getProperties().actExplorer.registerEventHandler( actuate.reportexplorer.
            EventConstants.ON_SELECTION_CHANGED, function(selected_item, path_name){
            if(path_name != null) {
                // TODO: Do this the angular way
                birtProperties.actReportDesign = path_name;
                window.actReportDesign = path_name;
                $('#openReportName').val(window.reportDesign);
            }else{
            }
        } );
        this.getProperties().actExplorer.setFolderName( "/" );
        var resultDef =
            "Name|FileType|Version|VersionName|Description";
        this.getProperties().actExplorer.setResultDef( resultDef.split("|") );
        this.getProperties().actExplorer.submit(function(){});
    };

    saveDialog = function(pane) {
        if(this.getProperties().actSaveExplorer == null) {
            this.getProperties().actSaveExplorer = new actuate.ReportExplorer(pane);
        }

        this.getProperties().actSaveExplorer = new actuate.ReportExplorer(pane);
        var birtProps = this.getProperties();
        this.getProperties().actSaveExplorer.registerEventHandler( actuate.reportexplorer.
            EventConstants.ON_SELECTION_CHANGED, function(selected_item, path_name){
            if(path_name != null) {
                // TODO: Do this the angular way
                window.actReportDesign = path_name;
                $('#saveReportName').val(birtProps.actReportDesign);
            }else{
            }
        } );
        this.getProperties().actSaveExplorer.setFolderName( "/" );
        var resultDef =
            "Name|FileType|Version|VersionName|Description";
        this.getProperties().actSaveExplorer.setResultDef( resultDef.split("|") );
        this.getProperties().actSaveExplorer.submit();
    };

    runReport = function(pane, reportName, parameters) {
        try {
            if(this.getProperties().reqOps == null) {
                this.getProperties().reqOps = new actuate.RequestOptions();
            }

            this.getProperties().reqOps.setRepositoryType(this.getProperties().actRepoType);
            this.getProperties().reqOps.setVolume(this.getProperties().actVolume);
            this.getProperties().reqOps.setCustomParameters(this.getProperties().actCustomParams);

            if(this.getProperties().actViewer == null) {
                this.getProperties().actViewer = new actuate.Viewer(pane);
            }

            if(this.getProperties().actUiOps == null) {
                this.getProperties().actUiOps = new actuate.viewer.UIOptions();
                this.getProperties().actUiOps.enableToolBar(false);
            }

            this.getProperties().options.enableToolBar(false);
            this.getProperties().actViewer.setUIOptions(this.getProperties().actUiOps);
            this.getProperties().actViewer.setParameterValues(pvalues);
            this.getProperties().actViewer.setReportDesign(this.getProperties().actReportDesign);

            this.getProperties().actViewer.setWidth($('.birtContainer').width() - 20);
            this.getProperties().actViewer.setHeight(1000);
            $('.birtViewer').width(2000)


            this.getProperties().actViewer.setUIOptions(this.getProperties().actUiOps);
            this.getProperties().actViewer.setParameterValues(parameters);
            var birtProps = this.getProperties();
            this.getProperties().actViewer.submit(function() {
            });
        }catch(err){
            console.log(err);
        }
    }

    openReport = function(dlg, pane, paramPane) {
        console.log('openReport');
        this.getParameters(dlg, pane, paramPane);
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