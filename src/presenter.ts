import * as vscode from 'vscode';
import { MainView as MainView } from './mainView';

export class Presenter {
    static mainView : MainView = new MainView();
    
    public static getActiveFilePath() {
        let activeTextEditor = vscode.window.activeTextEditor;

        if (!activeTextEditor) {
            throw new Error("Open a file!");
        }

        let path = activeTextEditor.document.uri.fsPath;
        return path;
    }

    public static showMainView() {
        Presenter.mainView.show();
    }

    public static async askSimpleInput(options: any) {
        let inputBoxOptions: vscode.InputBoxOptions = {
            value: options.placeholder,
            prompt: options.title
        };

        let what = await vscode.window.showInputBox(inputBoxOptions);
        return what;
    }
}