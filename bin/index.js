#!/usr/bin/env node
import { Command } from "commander";

import { checkNodeVersion, checkHardhatVersion } from "./checkNodeVersion.js";
import { sendFunds, getBalance } from "./celo-utils.js";
import { createAsync } from "./create.js";

const program = new Command();

let stdin = {
  stdin: "",
};

// Command to check OS, Node, and Hardhat versions
program
  .command("check")
  .description("Check OS, Node and Hardhart versions")
  .action(() => {
    checkNodeVersion(); // Ensure Node.js is properly set up
    checkHardhatVersion();
  });

  // Command to create a new Celo Gather Workshop project
program
  .command("create")
  .option("-t, --template <name>", "Specify a template to use for the project")
  .option(
    "-f, --force",
    "Force project creation even if the output directory is not empty"
  )
  .description("Generate a new Celo Gather Workshop project")
  .action(() => {
    checkNodeVersion(); // Ensure Node.js is properly set up
    checkHardhatVersion();
    createAsync();
  });

// Command to send funds to a specified address
program
  .command("send")
  .description("Send funds from one wallet to another")
  .requiredOption(
    "-p, --privateKey <privateKey>",
    "Private key of the sender's wallet"
  )
  .requiredOption("-f, --from <fromAddress>", "Sender's wallet address")
  .requiredOption("-t, --to <toAddress>", "Recipient's wallet address")
  .requiredOption(
    "-a, --amount <amount>",
    "Amount to send in CELO (or other token)"
  )
  .action(async (options) => {
    const { privateKey, fromAddress, toAddress, amount } = options;
    // Set values for the Celo transaction
    let pvtKey = privateKey;
    let accountFrom = fromAddress;
    let addressTo = toAddress;

    await sendFunds(amount); // Call the sendFunds function from celo-utils
  });

// Command to check the balance of a given wallet
program
  .command("balance")
  .description("Check the balance of a wallet")
  .requiredOption("-w, --wallet <walletAddress>", "Wallet address to check")
  .requiredOption("-c, --contract <contractAddress>", "Token contract address")
  .action(async (options) => {
    const { walletAddress, contractAddress } = options;
    await getBalance(walletAddress, contractAddress); // Call the getBalance function from celo-utils
  });

// Display help
program.on("--help", () => {
  console.log("");
  console.log("Examples:");
  console.log("  $ smart-contract-setup create");
  console.log("  $ smart-contract-setup create --template my-template");
  console.log("  $ smart-contract-setup deploy");
});

// Parse input from stdi
if (process.stdin.isTTY) {
  program.parse(process.argv);
} else {
  process.stdin.on("readable", function () {
    let chunk = this.read();
    if (chunk !== null) {
      stdin.stdin += chunk;
    }
  });
  process.stdin.on("end", () => program.parse(process.argv));
}

// Handle uncaught exceptions
process.on("uncaughtException", (err) => {
  if (err.code === "EADDRINUSE") {
    // console.log('Port already in use');
    return;
  } else if (err.message.includes("Timed out while waiting for handshake")) {
    // console.log('Ignoring timeout error');
    return;
  } else if (err.message.includes("Could not resolve")) {
    // console.log('Ignoring DNS Resolution error');
    return;
  } else {
    console.log("Unhandled exception. Shutting down", err);
  }
  process.exit(1);
});
