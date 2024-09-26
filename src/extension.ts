import { ethers } from "ethers";
import * as vscode from "vscode";
import { PreviewContentProvider } from "./preview-content-provider";

let previewProvider: PreviewContentProvider;

export function activate(context: vscode.ExtensionContext) {
  console.log('"crypto-dev-kit" is now active!');

  previewProvider = new PreviewContentProvider();
  const providerRegistration = vscode.workspace.registerTextDocumentContentProvider(
    "preview-scheme",
    previewProvider
  );
  context.subscriptions.push(providerRegistration);

  context.subscriptions.push(generateEthAddressCommand(context));
  context.subscriptions.push(ethAddressesHistoryCommand(context));
  context.subscriptions.push(ethAddressesFullHistoryCommand(context));
  context.subscriptions.push(ethAddressesClearCommand(context));
}

function ethAddressesClearCommand(context: vscode.ExtensionContext) {
  return vscode.commands.registerCommand("crypto-dev-kit.ethAddressesClear", () => {
    context.globalState.update("ethAddresses", []);
    vscode.window.showInformationMessage("Ethereum addresses cleared.");
  });
}

function ethAddressesFullHistoryCommand(context: vscode.ExtensionContext) {
  return vscode.commands.registerCommand("crypto-dev-kit.ethAddressesFullHistory", async () => {
    const ethAddresses = context.globalState.get("ethAddresses");
    if (ethAddresses && Array.isArray(ethAddresses)) {
      const addresses = JSON.stringify(ethAddresses, null, 2);
      const uri = vscode.Uri.parse("preview-scheme://authority/eth-addresses-full-history.json");
      previewProvider.updateContent(uri, addresses);
      // Open the virtual document in the editor in preview mode
      const doc = await vscode.workspace.openTextDocument(uri);
      await vscode.window.showTextDocument(doc, {
        preview: true, // Open in preview mode
        viewColumn: vscode.ViewColumn.Beside,
      });
    } else {
      vscode.window.showInformationMessage("No Ethereum addresses generated yet.");
    }
  });
}

function ethAddressesHistoryCommand(context: vscode.ExtensionContext) {
  return vscode.commands.registerCommand("crypto-dev-kit.ethAddressesHistory", async () => {
    const ethAddresses = context.globalState.get("ethAddresses");
    if (ethAddresses && Array.isArray(ethAddresses)) {
      const addresses = JSON.stringify(
        ethAddresses.map((callbackfn) => ({
          address: callbackfn.address,
          privateKey: callbackfn.privateKey,
          createdAt: new Date(),
        })),
        null,
        2
      );
      const uri = vscode.Uri.parse("preview-scheme://authority/eth-addresses.json");
      previewProvider.updateContent(uri, addresses);
      // Open the virtual document in the editor in preview mode
      const doc = await vscode.workspace.openTextDocument(uri);
      await vscode.window.showTextDocument(doc, {
        preview: true, // Open in preview mode
        viewColumn: vscode.ViewColumn.Beside,
      });
    } else {
      vscode.window.showInformationMessage("No Ethereum addresses generated yet.");
    }
  });
}

function generateEthAddressCommand(context: vscode.ExtensionContext) {
  return vscode.commands.registerCommand("crypto-dev-kit.generateEthAddress", () => {
    const wallet = ethers.Wallet.createRandom();
    const address = wallet.address;
    const ethAddresses = context.globalState.get("ethAddresses");
    if (ethAddresses && Array.isArray(ethAddresses)) {
      ethAddresses.push({
        ...wallet,
        privateKey: wallet.privateKey,
        createdAt: new Date(),
      });
      context.globalState.update("ethAddresses", ethAddresses);
    } else {
      context.globalState.update("ethAddresses", [
        { ...wallet, privateKey: wallet.privateKey, createdAt: new Date() },
      ]);
    }
    const editor = vscode.window.activeTextEditor;
    if (editor) {
      const position = editor.selection.active;
      editor.edit((editBuilder) => {
        editBuilder.insert(position, address);
      });
    }
  });
}

export function deactivate() {}
