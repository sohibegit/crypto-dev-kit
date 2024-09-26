# Crypto Dev Kit - VS Code Extension

This VS Code extension, `crypto-dev-kit`, provides a set of commands to work with Ethereum addresses, including generating new addresses, viewing address history, and clearing previously generated addresses. The extension uses the `ethers.js` library to generate Ethereum addresses and stores them in VS Code's global state for persistence across sessions.

## Features

- **Generate Ethereum Address**: Creates a new random Ethereum address and inserts it at the current cursor position in the active editor.
- **View Ethereum Address History**: Displays a list of previously generated Ethereum addresses in a preview window.
- **View Full Ethereum Address History**: Shows the full history of generated Ethereum addresses along with their private keys.
- **Clear Ethereum Address History**: Clears all stored Ethereum addresses from the global state.


## Commands

The following commands are available through the Command Palette (`Ctrl+Shift+P` or `Cmd+Shift+P` on Mac) or by using custom keybindings.

1. **Generate Ethereum Address** (`crypto-dev-kit.generateEthAddress`):  
   Generates a new random Ethereum address using `ethers.js` and inserts it into the current editor at the cursor position.

2. **View Ethereum Address History** (`crypto-dev-kit.ethAddressesHistory`):  
   Displays a history of previously generated Ethereum addresses (without private keys) in a preview window.

3. **View Full Ethereum Address History** (`crypto-dev-kit.ethAddressesFullHistory`):  
   Shows the complete history of generated Ethereum addresses, including private keys, in a preview window. *Note: Be careful with private key exposure.*

4. **Clear Ethereum Address History** (`crypto-dev-kit.ethAddressesClear`):  
   Clears the list of all previously generated Ethereum addresses.

## Usage

1. Open any file in VS Code.
2. Use the command palette (`Ctrl+Shift+P` or `Cmd+Shift+P` on Mac) and type one of the commands mentioned above.
3. If you use the `Generate Ethereum Address` command, the newly generated Ethereum address will be inserted into the editor at the current cursor position.
4. For viewing the address history or full history, the addresses will be displayed in a virtual document opened in a side preview window.

## Code Structure

- **`activate(context: vscode.ExtensionContext)`**: The entry point for the extension, registering all commands and the preview provider.
- **`generateEthAddressCommand`**: Handles the generation of a new Ethereum address and inserts it into the active editor.
- **`ethAddressesHistoryCommand`**: Retrieves the previously generated addresses and displays them in a preview window.
- **`ethAddressesFullHistoryCommand`**: Shows the full history, including private keys, of all Ethereum addresses in a preview window.
- **`ethAddressesClearCommand`**: Clears all stored Ethereum addresses from the global state.
- **`PreviewContentProvider`**: Handles the rendering of Ethereum address history in a preview window.

## Dependencies

- [`ethers`](https://docs.ethers.io/v5/) - A complete Ethereum library and wallet implementation.

## How to Contribute

1. Fork the repository.
2. Create a new branch for your feature or bugfix.
3. Submit a pull request with a detailed description of your changes.

## License

This project is licensed under the MIT License.

---

Feel free to modify this extension as per your development needs and enhance its functionality!

