#!/usr/bin/env node
import { checkNodeVersion } from './checkNodeVersion.js';
import { execSync } from 'child_process';

// Function to set up Mento (cKES) boilerplate for Next.js
function setupMentoBoilerplate() {
    console.log('Initializing a Mento (cKES) new Next.js project...');
    try {
        execSync('npx create-next-app@latest my-nextjs-app --example https://github.com/Celo-Africa-DAO/mento-boilerplate', { stdio: 'inherit' });
    } catch (error) {
        console.error('Failed to initialize Next.js project.', error);
    }
}

// Function to initialize a Hardhat project
function setupHardhat() {
    console.log('Initializing a Hardhat project...');
    try {
        execSync('mkdir my-hardhat-project && cd my-hardhat-project && npm init -y && npm install --save-dev hardhat && npx hardhat', { stdio: 'inherit' });
    } catch (error) {
        console.error('Failed to initialize Hardhat project.', error);
    }
}

// Function to set up Minipay boilerplate for Celo Composer
function setupMinipayBoilerplate() {
    console.log('Initializing a Minipay boilerplate for Celo Composer...');
    try {
        execSync('npx celo-composer create my-minipay-dapp --template minipay', { stdio: 'inherit' });
    } catch (error) {
        console.error('Failed to set up Minipay boilerplate for Celo Composer.', error);
    }
}

function main() {
    checkNodeVersion(); // Ensure Node.js is properly set up

    console.log('\nChoose your project setup:');
    console.log('1. Initialize a Mento (cKES) Next.js project');
    console.log('2. Initialize a Hardhat project');
    console.log('3. Initialize a Minipay Celo Composer project');
    
    // New option added

    process.stdin.setEncoding('utf8');
    process.stdin.on('data', (input) => {
        const choice = input.trim();

        switch (choice) {
            case '1':
                setupMentoBoilerplate();
                break;
            case '2':
                setupHardhat();
                break;
            case '3':
                setupMinipayBoilerplate();
                break;
            default:
                console.log('Invalid choice. Please enter a number between 1 and 5.');
        }

        process.exit();
    });
}

main();
