//@ts-check
'use strict';

const vscode = require('vscode');
const firebase = require('firebase');
const path =  require('path');
//import * as firepad from 'firepad';

const firepad = require('firepad');

console.log(firepad);

function activate(context) {
    const config = {
        //apiKey: 'AIzaSyDdNy3Gv73fsu2T8DEvUoDDs4X_eUdVnJo',
        databaseURL: 'https://devunityio.firebaseio.com',
        projectId: 'devunityio',
        messagingSenderId: '311071374268'
    };
    firebase.initializeApp(config);

    let initialized = false;
    let database = firebase.database();
    let refcode = database.ref('/c').child('test1234');
    
    function saveDocument(doc) {
        const file = path.basename(doc.fileName).replace(/[^a-z0-9-]/gi, '_');
        console.log(file);
        //refcode.set(doc.getText());

    }

    let disposable = vscode.commands.registerCommand('extension.shareCode', () => {
        vscode.window.showInformationMessage(`Sharing code on Firebase: ${config.databaseURL}`);
       

        let currOpenEditor = vscode.window.activeTextEditor;
        if (currOpenEditor){
    
            // In this example, we want to start watching the currently open doc
            let currActiveDoc = currOpenEditor.document;
    
            //var fp = firepad.fromACE(refcode, currOpenEditor);
    
            /*fp.on('ready', function() {
    
                console.log('ready!');
    
            });*/

            let onDidChangeDisposable = vscode.workspace.onDidChangeTextDocument((event)=>{
                if (event.document === currActiveDoc){
                    console.log('Watched doc changed');
    
                    saveDocument(currOpenEditor.document);
    
                }
                else {
                    console.log('Non watched doc changed');
                }
            });
            
            let onDidCloseDisposable = vscode.workspace.onDidCloseTextDocument((closedDoc)=>{
                if (closedDoc === currActiveDoc){
                    console.log('Watched doc was closed');
                }
                else {
                    console.log('non watched doc closed');
                }
            });
        }


        /*
        if (!initialized) {
            //vscode.workspace.onDidChangeTextDocument(context.subscriptions);
            initialized = true;
        }
        if (vscode.window.activeTextEditor) {
            saveDocument(vscode.window.activeTextEditor.document);
        }*/


    });

    context.subscriptions.push(disposable);
}

function deactivate() {
}


module.exports = {
	activate,
	deactivate
}