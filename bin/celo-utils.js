import { ethers, formatEther, parseUnits } from 'ethers'

// Celo Alfajores Testnet RPC URL
const rpcURL = "https://alfajores-forno.celo-testnet.org";
// https://alfajores-forno.celo-testnet.org 
const provider = new ethers.JsonRpcProvider(rpcURL)
const cUSD_CA = '0x874069fa1eb16d44d622f2e0ca25eea172369bc1'
const cKES_CA = ''

// ABI to interact with a token contract for balance checking
const ABI = [
    {
        "constant": true,
        "inputs": [{ "name": "_owner", "type": "address" }],
        "name": "balanceOf",
        "outputs": [{ "name": "balance", "type": "uint256" }],
        "type": "function"
    }
];

const signer = async(pvtKey) => {
    const wallet = new ethers.Wallet(pvtKey, provider)
    return wallet
}

/**
 * Function to send funds from one account to another on Celo
 */
async function sendFunds(pvtKey, addressTo, amountInEther) {
    console.log(pvtKey, addressTo, amountInEther)
    try {
        const sign  = await signer(pvtKey)
                
        const tx = {
            gas: 21000,
            to: addressTo,
            value: parseUnits(amountInEther.toString(), 18),
            feeCurrency: '0x874069fa1eb16d44d622f2e0ca25eea172369bc1',  // "0x2f25deb3848c207fc8e0c34035b3ba7fc157602b", // USDC Adapter address
        };

        const signedTx = await sign.sendTransaction(tx)
        const receipt = await signedTx.wait()

        console.log('Transaction receipt:', receipt);
    } catch (error) {
        console.error('Error sending funds:', error);
    }
}

/**
 * Function to check the balance of a given wallet
 */
async function getNativeBalance(walletAddress) {
    try {
        console.log

        const balance = await provider.getBalance(walletAddress)
        const amountInEther = formatEther(balance.toString(), 18)

        console.log(`Balance for address ${walletAddress}:`, amountInEther);
        return amountInEther;
    } catch (error) {
        console.error('Error checking balance:', error);
    }
}


export {
    sendFunds,
    getNativeBalance
};