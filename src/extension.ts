import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
	const runNewBlogCommand = vscode.commands.registerCommand('extension.runNewBlog', async () => {
		runCommandInTerminal('bash new.sh');
	});
	context.subscriptions.push(runNewBlogCommand);

	const runOpenREADMECommand = vscode.commands.registerCommand('extension.runOpenREADME', async () => {
		runCommandInTerminal('code README.md');
	});
	context.subscriptions.push(runOpenREADMECommand);
}

export function deactivate() { }

function runCommandInTerminal(command: string) {
	const currentWorkspace = vscode.workspace.workspaceFolders?.[0]?.uri.fsPath;
	if (!currentWorkspace) {
		vscode.window.showErrorMessage('No workspace folder open');
		return;
	}

	const terminal = vscode.window.createTerminal(command);
	terminal.show();
	terminal.sendText(command);
}
