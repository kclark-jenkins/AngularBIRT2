import {Property} from "./property";
declare var actuate:any;

function loadStuff() {
}
export const BIRTPROPERTIES: Property = {
    isLoaded:      false,
    username:      "Administrator",
    password:      "",
    ihub:          "http://ihub.demoimage.com:8700/iportal",
    reqOps:        new actuate.RequestOptions( ),
    resultDef:     'Name|FileType|Version|VersionName|Description',
    openDiv:       'reportExplorer',
    saveDiv:       'saveExplorer',
    paramDiv:      'reportExplorerParameters',
    actRepoType:   'Enterprise',
    actVolume:     'Default Volume',
    actCustomParams: {},
    openExplorer: null,
    saveExplorer: null,
    birtParameters: null,
    actViewer: null,
    actUiOps: null,
    actExplorer: null,
    actViewerContainer: 'birt',
    actSaveExplorer: null,
    actOptions: null,
    actReportDesign: null,
    actInitModules: function() {
        try {
            actuate.load('viewer');
            actuate.load('parameter');
            actuate.load('reportexplorer');
            actuate.load('dialog');
            actuate.load('parameter');
        }catch(err){
            console.log(err);
        }
    },
    actInit:      function(host, ops, user, pass, callback){
        try {
            actuate.initialize( host, ops, user, pass, callback);
        }catch(err){
            console.log(err);
        }
    }
};