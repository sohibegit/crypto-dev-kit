import * as vscode from "vscode";

export class PreviewContentProvider implements vscode.TextDocumentContentProvider {
  private _onDidChange = new vscode.EventEmitter<vscode.Uri>();
  public onDidChange = this._onDidChange.event;

  // This holds the content of the document
  private content: string = "Initial content.";

  // Provide content for the virtual document
  provideTextDocumentContent(uri: vscode.Uri): string {
    return this.content;
  }

  // Custom method to update the content and trigger the onDidChange event
  public updateContent(uri: vscode.Uri, newContent: string) {
    this.content = newContent;
    // Trigger onDidChange to notify VS Code that the content has changed for the specific URI
    this._onDidChange.fire(uri);
  }
}
