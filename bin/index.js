#!/usr/bin/env node
import { Command } from 'commander';

import { checkNodeVersion, checkHardhatVersion } from "./checkNodeVersion.js";
import { createAsync } from "./create.js";

const program = new Command();

let stdin = {
  stdin: "",
};



// // Function to set up Mento (cKES) boilerplate for Next.js
// function setupMentoBoilerplate() {
//     console.log('Initializing a Mento (cKES) new Next.js project...');
//     try {
//         execSync('npx create-next-app@latest my-nextjs-app --example https://github.com/Celo-Africa-DAO/mento-boilerplate', { stdio: 'inherit' });
//     } catch (error) {
//         console.error('Failed to initialize Next.js project.', error);
//     }
// }

// // Function to initialize a Hardhat project
// function setupHardhat() {
//     console.log('Initializing a Hardhat project...');
//     try {
//         execSync('mkdir hardhat-project && cd my-hardhat-project && npm init -y && npm install --save-dev hardhat && npx hardhat', { stdio: 'inherit' });
//     } catch (error) {
//         console.error('Failed to initialize Hardhat project.', error);
//     }
// }

// // Function to set up Minipay boilerplate for Celo Composer
// function setupMinipayBoilerplate() {
//     console.log('Initializing a Minipay boilerplate for Celo Composer...');
//     try {
//         execSync('npx celo-composer create my-minipay-dapp --template minipay', { stdio: 'inherit' });
//     } catch (error) {
//         console.error('Failed to set up Minipay boilerplate for Celo Composer.', error);
//     }
// }



    program.command("check")
    .description("Check OS, Node and Hardhart versions")
    .action(() => {
        checkNodeVersion(); // Ensure Node.js is properly set up
        checkHardhatVersion();
    })

  program
  .command("create")
  .option("-t, --template <name>", "Specify a template to use for the project")
  .option(
    "-f, --force",
    "Force project creation even if the output directory is not empty")
  .description("Generate a new Celo Gather Workshop project")
  .action(() => {
    checkNodeVersion(); // Ensure Node.js is properly set up
    checkHardhatVersion();
    createAsync()
  });

program.on("--help", () => {
  console.log("");
  console.log("Examples:");
  console.log("  $ smart-contract-setup create");
  console.log("  $ smart-contract-setup create --template my-template");
  console.log("  $ smart-contract-setup deploy");
});

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




