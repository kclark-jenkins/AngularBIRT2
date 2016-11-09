import {Injectable, ElementRef} from '@angular/core';
import { Property } from './property';
import { BIRTPROPERTIES } from './birt';
declare var $:any;
declare var actuate:any;

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
        var birtProperties = this.getProperties();

        if(this.getProperties().birtParameters == null) {
            birtProperties.birtParameters = new actuate.Parameter(birtProperties.paramDiv);
        }

        birtProperties.birtParameters.setReportName(window.actReportDesign);

        this.getProperties().birtParameters.registerEventHandler(actuate.parameter.EventConstants.ON_EXCEPTION, function(viewerInstance, exception){
            console.log(exception)
        });


        birtProperties.birtParameters.submit(function() {
            console.log('test1');
            birtProperties.reqOps.setRepositoryType('Enterprise');
            birtProperties.reqOps.setVolume('Default Volume');
            birtProperties.reqOps.setCustomParameters({});
            birtProperties.actViewer = new actuate.Viewer(birtProperties.actViewerContainer);
            birtProperties.actViewer.setReportName(window.actReportDesign);

            birtProperties.actViewer.registerEventHandler(actuate.viewer.EventConstants.ON_EXCEPTION, function(viewerInstance, exception){
                if($('.designMessage').is(":visible")) {
                    $('.designMessage').fadeOut('fast', function() {
                        $('#' + pane).fadeIn('slow', function(){});
                    })

                    $('.currentPage').html('1');
                    $('.totalPages').html(birtProperties.actViewer.getTotalPageCount());
                }

                console.log(exception)
                $('.reportExplorerControls').fadeOut('slow', function() {
                    $('#openDialogTitle').html('Report Parameters');
                    $('.reportExplorerParameters').fadeIn('slow', function(){});
                });
            });

            // TOOLBAR
            var uioptions = new actuate.viewer.UIOptions( );
                uioptions.enableToolBar(false);

            birtProperties.actViewer.setWidth($('.birtContainer').width() - 25);
            birtProperties.actViewer.setHeight($('.birtContainer').height() - 70);
            birtProperties.actViewer.setUIOptions(uioptions);
            birtProperties.actViewer.submit(function() {
                birtProperties.actViewer.enableIV(function(){});
                if($('.designMessage').is(":visible")) {
                    $('.designMessage').fadeOut('fast', function() {
                        $('#' + pane).fadeIn('slow', function(){});
                    })

                    $('.currentPage').html('1');
                    $('.totalPages').html(birtProperties.actViewer.getTotalPageCount());
                }
                console.log('birtProperties.actViewer.submit(function(){}: LINE 57');
                dlg.close();
            });
        });
    }

    openDialogRunParameters = function(pane, dlg) {
        console.log('openDialogRunParameters');
        var birtProperties = this.getProperties();

        this.getProperties().birtParameters.setReportName(window.actReportDesign);
        this.getProperties().birtParameters.downloadParameterValues(function(pvalues) {
            console.log(pvalues);
            birtProperties.actViewer.setParameterValues(pvalues);
            birtProperties.actViewer.submit(function(){
                birtProperties.actViewer.enableIV(function(){});
                console.log('birtProperties.actViewer.submit(function(){}: LINE 78');
                $('.currentPage').html('1');
                $('.totalPages').html(birtProperties.actViewer.getTotalPageCount());
                dlg.close();
            });
        });
    }

    openParameters = function(dlg, pane) {
        if(this.getProperties().birtParameters == null) {
            this.getProperties().birtParameters = new actuate.Parameter(pane);
        }

        this.getProperties().birtParameters.setReportName(this.getProperties().actReportDesign);
        this.getProperties().birtParameters.registerEventHandler(actuate.parameter.EventConstants.ON_EXCEPTION, function(viewerInstance, exception){
            console.log('error')
        })
        this.getProperties().birtParameters.submit(function() {
            window.params = birtParameters;
            console.log('this.getProperties().birtParameters.submit(function(){}: LINE 92');
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
                $('#openReportName').val(path_name);
            }else{
            }
        }, function() {
            console.log('error')
        } );
        this.getProperties().actExplorer.setFolderName( "/" );
        var resultDef =
            "Name|FileType|Version|VersionName|Description";
        this.getProperties().actExplorer.setResultDef( resultDef.split("|") );
        //this.getProperties().actExplorer.setReportName(window.actReportDeign); // Kris
        this.getProperties().actExplorer.submit(function(){
            console.log('this.getProperties().actExplorer.submit(function(){}: LINE 130');
            // Kris2
        });
    };

    saveDialog = function(pane) {
        if(this.getProperties().actSaveExplorer == null) {
            this.getProperties().actSaveExplorer = new actuate.ReportExplorer(pane);
        }

        this.getProperties().actSaveExplorer = new actuate.ReportExplorer(pane);
        var birtProperties = this.getProperties();
        this.getProperties().actSaveExplorer.registerEventHandler( actuate.reportexplorer.
            EventConstants.ON_SELECTION_CHANGED, function(selected_item, path_name){
            if(path_name != null) {
                birtProperties.newReportDesign = path_name;
                $('#saveReportName').val(birtProperties.newReportDesign);
            }else{
            }
        });
        this.getProperties().actSaveExplorer.setFolderName( "/" );
        var resultDef =
            "Name|FileType|Version|VersionName|Description";
        this.getProperties().actSaveExplorer.setResultDef( resultDef.split("|") );
        this.getProperties().actSaveExplorer.registerEventHandler(actuate.reportexplorer.EventConstants.ON_EXCEPTION, function(viewerInstance, exception){
            console.log('error')
        });
        this.getProperties().actSaveExplorer.submit();
    };

    runReport = function(pane, reportName, parameters) {
        try {
            if (this.getProperties().reqOps == null) {
                this.getProperties().reqOps = new actuate.RequestOptions();
            }

            this.getProperties().reqOps.setRepositoryType(this.getProperties().actRepoType);
            this.getProperties().reqOps.setVolume(this.getProperties().actVolume);
            this.getProperties().reqOps.setCustomParameters(this.getProperties().actCustomParams);

            if (this.getProperties().actViewer == null) {
                this.getProperties().actViewer = new actuate.Viewer(pane);
                var uioptions = new actuate.viewer.UIOptions( );
                uioptions.enableToolBar(false);
            }

            if (this.getProperties().actUiOps == null) {
                this.getProperties().actUiOps = new actuate.viewer.UIOptions();
                this.getProperties().actUiOps.enableToolBar(false);
            }

            var uioptions = new actuate.viewer.UIOptions( );
            uioptions.enableToolBar(false);
            
            this.getProperties().actViewer.setParameterValues(pvalues);
            this.getProperties().actViewer.setReportName(this.getProperties().actReportDesign);

            this.getProperties().actViewer.setWidth($('.birtContainer').width() - 20);
            this.getProperties().actViewer.setHeight(1000);
            $('.birtViewer').width(2000)


            this.getProperties().actViewer.setParameterValues(parameters);
            var birtProperties = this.getProperties();
            this.getProperties().actViewer.registerEventHandler(actuate.viewer.EventConstants.ON_EXCEPTION, function (viewerInstance, exception) {
                console.log('error')
            });
            this.getProperties().actUiOpts.enableToolBar(false);
            this.getProperties().actViewer.submit(function () {
                birtProperties.actViewer.enableIV(function(){});
                console.log('this.getProperties().actViewer.submit(function(){}: LINE 196');
                $('.currentPage').html('1');
                $('.totalPages').html(birtProperties.actViewer.getTotalPageCount());
            });
        } catch (err) {
            console.log(err);
        }
    };

    openReport = function(dlg, pane, paramPane) {
        console.log('openReport');
        this.getParameters(dlg, pane, paramPane);
    };

    saveReport = function(dlg) {
        alert($('#saveReportName').val());
        this.getProperties().actViewer.saveReportDesign($('#saveReportName').val());
        dlg.close();
    };

    parametersDialog = function() {
        console.log('Parameters Dialog');
    };

    filtersDialog = function() {
        console.log('Filters Dialog');
    };

    helpDialog = function() {
        console.log('Help Dialog');
    };

    updatePagination = function() {
        $('.currentPage').html(this.getProperties().actViewer.getCurrentPageNum( ));
        $('.totalPages').html(this.getProperties().getTotalPageCount());
    }

    move = function(direction) {
        switch(direction) {
            case 'FORWARD':
                this.getProperties().actViewer.gotoPage(this.getProperties().actViewer.getCurrentPageNum( ) + 1);
                this.updatePagination();
                break;
            case 'BACKWARD':
                this.getProperties().actViewer.gotoPage(this.getProperties().actViewer.getCurrentPageNum( ) - 1);
                this.updatePagination();
                break;
            case 'FIRST':
                this.getProperties().actViewer.gotoPage(1);
                this.updatePagination();
                break;
            case 'LAST':
                this.getProperties().actViewer.gotoPage(this.getProperties().getTotalPageCount());
                this.updatePagination();
                break;
        }
    }

    export = function(filetype) {
        console.log('exporting');
        switch(filetype){
            case 'XLS':
                console.log(filetype);
                this.getProperties().actViewer.downloadReport('xls', null, null);
                break;
            case 'PDF':
                console.log(filetype);
                this.getProperties().actViewer.downloadReport('pdf', null, null);
            case 'XLSX':
                console.log(filetype);
                this.getProperties().actViewer.downloadReport('xlsx', null, null);
                break;
            case 'PS':
                console.log(filetype);
                this.getProperties().actViewer.downloadReport('ps', null, null);
                break;
            case 'PPT':
                console.log(filetype);
                this.getProperties().actViewer.downloadReport('ppt', null, null);
                break;
            case 'PPTX':
                console.log(filetype);
                this.getProperties().actViewer.downloadReport('pptx', null, null);
                break;
            case 'DOC':
                console.log(filetype);
                this.getProperties().actViewer.downloadReport('doc', null, null);
                break;
            case 'DOCX':
                console.log(filetype);
                this.getProperties().actViewer.downloadReport('docx', null, null);
                break;
            case 'XHTML':
                console.log(filetype);
                this.getProperties().actViewer.downloadReport('xhtml', null, null);
                break;
            case 'PRINT':
                console.log(filetype);
                //this.getProperties().actViewer.downloadReport('', null, null);
                break;
        }
    }
}