import {Property} from "./property";
function loadStuff() {
}
export const BIRTPROPERTIES: Property = {
    isLoaded:     false,
    username:     "Administrator",
    password:     "",
    ihub:         "http://ihub.demoimage.com:8700/iportal",
    reqOps:       new actuate.RequestOptions( ),
    resultDef:    'Name|FileType|Version|VersionName|Description',
    openDiv:      'reportExplorer',
    saveDiv:      'saveExplorer',
    openExplorer: null,
    saveExplorer: null,
    load:         function(host, ops, user, pass, callback){
        actuate.initialize( host, ops, user, pass, callback);
    }
};