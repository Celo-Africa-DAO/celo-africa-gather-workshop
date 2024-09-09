# Smart Contract Setup CLI

A command-line interface (CLI) tool to help developers easily set up smart contract projects, check balances, and send funds using Celo blockchain, Hardhat, and Node.js.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
  - [Check Node and Hardhat Versions](#check-node-and-hardhat-versions)
  - [Create a New Celo Project](#create-a-new-celo-project)
  - [Send Funds](#send-funds)
  - [Check Wallet Balance](#check-wallet-balance)
- [Commands](#commands)
  - [check](#check-command)
  - [create](#create-command)
  - [send](#send-command)
  - [balance](#balance-command)
- [Examples](#examples)
- [License](#license)

## Installation

Before using the tool, ensure you have Node.js installed on your system. You can install the tool by cloning this repository and running `npm install` to install the dependencies.

```bash
git clone <repo-url>
cd smart-contract-setup
npm install


## Usage

Once installed, you can use the following commands to check versions, create new projects, send funds, and check balances.


# Check Node and Hardhat Versions
The check command verifies your current Node.js version, Hardhat version, and operating system compatibility.

```bash
smart-contract-setup check

Create a New Celo Project
The create command initializes a new Celo project based on specified templates.

```bash
smart-contract-setup create --template <template-name>

Options:

--template <name>: Specify a project template.
--force: Force project creation even if the output directory is not empty.
Send Funds
The send command allows you to send funds from one wallet to another on the Celo network.

```bash
smart-contract-setup send --privateKey <your-private-key> --from <sender-address> --to <recipient-address> --amount <amount-in-CELO>

Options:

--privateKey <key>: The private key of the sender's wallet.
--from <address>: The wallet address of the sender.
--to <address>: The wallet address of the recipient.
--amount <amount>: The amount of CELO (or other tokens) to send.

# Check Wallet Balance
The balance command checks the balance of a given wallet on the Celo network.

```bash
smart-contract-setup balance --wallet <wallet-address> --contract <token-contract-address>

Options:

--wallet <address>: The address of the wallet whose balance you want to check.
--contract <address>: The contract address of the token (e.g., CELO, cUSD).


Commands
check Command
Check the current OS, Node.js, and Hardhat versions.

bash
Copy code
smart-contract-setup check
create Command
Create a new Celo project with a specific template.

bash
Copy code
smart-contract-setup create --template <template-name> [--force]
Options:

--template <template-name>: Specify a template to use for project creation.
--force: Force creation even if the output directory is not empty.
send Command
Send funds from one wallet to another on the Celo network.

```bash
smart-contract-setup send --privateKey <your-private-key> --from <sender-address> --to <recipient-address> --amount <amount-in-CELO>
Options:

--privateKey <key>: The private key of the sender's wallet.
--from <address>: The sender's wallet address.
--to <address>: The recipient's wallet address.
--amount <amount>: The amount of CELO to send.

balance Command
Check the balance of a wallet for a specific token on the Celo network.

```bash
smart-contract-setup balance --wallet <wallet-address> --contract <token-contract-address>
Options:

--wallet <address>: The wallet address to check the balance of.
--contract <address>: The token contract address (e.g., CELO, cUSD).