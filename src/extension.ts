import * as vscode from 'vscode';
import { RestDebugger } from './debugger';
import { Builder } from './builder';
import { Presenter } from './presenter';
import { Root } from './root';
import { Feedback } from './feedback';

export function activate(context: vscode.ExtensionContext) {
	Root.ExtensionContext = context;

	registerCustomCommand(context, 'extension.openIDE', openIDE);
	registerCustomCommand(context, 'extension.buildCurrentFile', buildCurrentFile);
	registerCustomCommand(context, 'extension.startDebugServer', startDebugServer);

	Feedback.debug(`Node version: ${process.version}.`);
}

export function deactivate() { }

function registerCustomCommand(context: vscode.ExtensionContext, name: string, action: CallableFunction) {
	let disposable = vscode.commands.registerCommand(name, () => action());
	context.subscriptions.push(disposable);
}

function openIDE() {
	Presenter.showMainView();
}

function buildCurrentFile() {
	let filePath = Presenter.getActiveFilePath();
	Builder.buildFile(filePath);
}

function startDebugServer() {
	RestDebugger.startServer();
}