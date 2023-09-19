const { Web3 } = require('web3');
const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));


// replace this data with data from your blockchain
const senderAddress = "0x892BB2e4F6b14a2B5b82Ba8d33E5925D42D4431F";
const senderPrivateKey = "0xcb1a18dff8cfcee16202bf86f1f89f8b3881107b8192cd06836fda9dbc0fde1b";
const recepientAddress = "0x9949f7e672a568bB3EBEB777D5e8D1c1107e96E5";

console.log("Sending 1 ether from address:", senderAddress, "to address:", recepientAddress);

async function transfer() {
    // nonce starts at 0 and increments by 1 after each transaction
    const nonce = await web3.eth.getTransactionCount(senderAddress, "latest");

    // block = await web3.eth.getBlock('latest')
    //console.log(block)
    gasPrice = await web3.eth.getGasPrice()

    const transaction = {
        to: recepientAddress,
        value: web3.utils.toWei("1", "ether"),
        gasPrice: gasPrice,
        gas: 100000,
        nonce: nonce,
    };

    const signedTx = await web3.eth.accounts.signTransaction(
        transaction,
        senderPrivateKey
    );

    const rawTransaction = signedTx.rawTransaction;

    console.log("Nonce for address", senderAddress, "is:", nonce);
    console.log("Raw transaction:", rawTransaction);

    let hash = await web3.eth.sendSignedTransaction(rawTransaction)
    console.log("The hash of your transaction is: ", hash.transactionHash)

}

transfer();