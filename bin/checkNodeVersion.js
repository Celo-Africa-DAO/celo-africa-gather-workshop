import os from 'os';
import { execSync } from 'child_process';
import https from 'https';
import fs from 'fs';
import path from 'path';

export function checkNodeVersion() {
    try {
        const nodeVersion = execSync('node -v', { encoding: 'utf8' }).trim();
        console.log(`Node.js version installed: ${nodeVersion}`);
        const majorVersion = parseInt(nodeVersion.replace('v', '').split('.')[0]);

        if (majorVersion < 18) {
            console.log('Node.js version is too old. Installing Node.js 18.x or later...');
            downloadNodeInstaller();
        } else {
            console.log('Node.js version is compatible.');
        }
    } catch (error) {
        console.log('Node.js is not installed. Installing Node.js 18.x or later...');
        downloadNodeInstaller();
    }
}

function downloadNodeInstaller() {
    const osType = os.type();
    let downloadUrl;
    let installerName;

    if (osType === 'Windows_NT') {
        downloadUrl = 'https://nodejs.org/dist/latest-v18.x/node-v18.x.x-x64.msi';
        installerName = 'node-installer.msi';
    } else if (osType === 'Darwin') {
        downloadUrl = 'https://nodejs.org/dist/latest-v18.x/node-v18.x.x.pkg';
        installerName = 'node-installer.pkg';
    } else if (osType === 'Linux') {
        downloadUrl = 'https://nodejs.org/dist/latest-v18.x/node-v18.x.x-linux-x64.tar.xz';
        installerName = 'node-installer.tar.xz';
    } else {
        console.log('Unsupported OS type for automatic Node.js installation.');
        return;
    }

    console.log(`Downloading Node.js installer from ${downloadUrl}...`);

    const filePath = path.join(__dirname, installerName);

    https.get(downloadUrl, (response) => {
        const fileStream = fs.createWriteStream(filePath);
        response.pipe(fileStream);

        fileStream.on('finish', () => {
            fileStream.close();
            console.log(`Node.js installer downloaded to ${filePath}`);

            if (osType === 'Windows_NT' || osType === 'Darwin') {
                console.log('Please run the installer manually to complete the installation.');
            } else if (osType === 'Linux') {
                console.log('Please extract the tarball and add Node.js to your PATH.');
            }
        });
    }).on('error', (err) => {
        console.error(`Error downloading Node.js installer: ${err.message}`);
    });
}
