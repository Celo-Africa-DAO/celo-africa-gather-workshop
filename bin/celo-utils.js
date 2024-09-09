import Web3 from 'web3';

// Celo Alfajores Testnet RPC URL
const rpcURL = "https://alfajores-forno.celo-testnet.org"; 
const web3 = new Web3(rpcURL);

// Enter your private key, sender address, and the recipient's address
let pvtKey = "";  // enter your private key
let accountFrom = "";  // enter your wallet address
let addressTo = "";  // enter the recipient's address


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


/**
 * Function to send funds from one account to another on Celo
 */
async function sendFunds(amountInEther) {
    try {
        const gasPrice = await web3.eth.getGasPrice();
        const nonce = await web3.eth.getTransactionCount(accountFrom);

        const tx = {
            gas: 21000,
            to: addressTo,
            value: web3.utils.toWei(amountInEther, 'ether'),
            gasPrice: gasPrice,
            nonce: nonce,
        };

        const signedTx = await web3.eth.accounts.signTransaction(tx, pvtKey);
        const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);

        console.log('Transaction receipt:', receipt);
    } catch (error) {
        console.error('Error sending funds:', error);
    }
}

/**
 * Function to check the balance of a given wallet
 */
async function getBalance(walletAddress, tokenAddress) {
    try {
        const contract = new web3.eth.Contract(ABI, tokenAddress);
        const balance = await contract.methods.balanceOf(walletAddress).call();
        const readableBalance = web3.utils.fromWei(balance, 'ether');

        console.log(`Balance for address ${walletAddress}:`, readableBalance);
        return readableBalance;
    } catch (error) {
        console.error('Error checking balance:', error);
    }
}


export {
    sendFunds,
    getBalance
};