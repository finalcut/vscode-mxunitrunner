// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
let vscode = require('vscode');
let path = require('path');

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
function activate(context) {
    let disposable = vscode.commands.registerCommand('extension.mxunit', function() {
        let editor = vscode.window.activeTextEditor;
        if(!editor){
            vscode.window.showWarningMessage('No Active MxUnit Test File!');
        }
        const ext = path.extname(editor.document.fileName);
        const fullPath = editor.document.uri.fsPath;

        

        if (/^\.(cfc)$/.test(ext)) {
            let baseUrl = 'http://warp.com/warp';
            let projectRoot = 'c:\\dev\\websites\\wcs_ten\\site\\WARP\\';

            let relPath = replaceAll(fullPath,projectRoot,'/');
            relPath = replaceAll(relPath,'\\','/');


            


            


            let testName = getSelectedText(editor);
            if(testName.length){
                testName = '&testMethod=' + testName
            }
            vscode.window.showInformationMessage(baseUrl + relPath  + '?method=runtestremote&output=html' + testName);
        } else {
            vscode.window.showInformationMessage('Suppoorts cfc files only!');
        }
	});


    context.subscriptions.push(disposable);
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {
}
exports.deactivate = deactivate;


function getSelectedText(textEditor) {
  return textEditor.document.getText(getSelectionRange(textEditor));
}

function getSelectionRange(textEditor) {
  let
    selection = textEditor.selection,
    start = selection.start,
    end = selection.end;
  return new vscode.Range(start, end);
}

function escapeRegExp(str) {
    return str.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
}

function replaceAll(str, find, replace) {
  return str.replace(new RegExp(escapeRegExp(find), 'g'), replace);
}