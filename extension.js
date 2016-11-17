// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
let vscode = require('vscode');
let path = require('path');
let open = require('open');

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
function activate(context) {
    let disposable = vscode.commands.registerCommand('extension.mxunit', function() {
        let editor = vscode.window.activeTextEditor;
        let config =  vscode.workspace.getConfiguration('mxunit');

        if(config){

            if(!editor){
                vscode.window.showWarningMessage('No Active MxUnit Test File!');
            }
            const ext = path.extname(editor.document.fileName);
            const fullPath = editor.document.uri.fsPath;

            

            if (/^\.(cfc)$/.test(ext)) {
                let baseUrl = config.baseUrl;
                let projectRoot = vscode.workspace.rootPath;

                let relPath = replaceAll(fullPath,projectRoot,'/');
                relPath = replaceAll(relPath,'\\','/');

                let testName = getSelectedText(editor);
                if(testName.length){
                    testName = '&testMethod=' + testName
                }
                let fullURL = baseUrl + relPath  + '?method=runtestremote&output=html' + testName;



                try {
                open(decodeURIComponent(fullURL));
                }
                catch (error) {
                vscode.window.showInformationMessage('Couldn\'t open file.');
                console.error(error.stack);
                }


            } else {
                vscode.window.showInformationMessage('Suppoorts cfc files only!');
            }
        } else {
            vscode.window.showInformationMessage('Your Project needs to define mxunit settings!');
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