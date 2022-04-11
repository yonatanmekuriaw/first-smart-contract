const { ethers } = require("hardhat");

const API_KEY = process.env.API_KEY;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;

const contract = require("../artifacts/contracts/FirstSmartContract.sol/FirstSmartContract.json");

console.log(JSON.stringify(contract.abi)+"\n\n");

//prvider which gives you read and write access to the blockchain.
const alchemyProvider = new ethers.providers.AlchemyProvider(network ="ropsten",API_KEY);
//signer which is the ethereum account that has the ability to sign transactions
const signer = new ethers.Wallet(PRIVATE_KEY,alchemyProvider);
//contract which is an Ethers.js object that represents a specific contract deployed on chain
const firstSmartContract = new ethers.Contract(CONTRACT_ADDRESS,contract.abi,signer);

async function main(){
    const message = await firstSmartContract.message();
    console.log("The message is:" + message)
    
    console.log("Updating the message...");
    const tx = await firstSmartContract.update("This is the new message for our first smart contract.");
    await tx.wait();

    const newMessage = await firstSmartContract.message();
    console.log("The new message is:" + newMessage);
}

//hadrhat-etherscan verification service on etherscan
//  npx hardhat verify --network ropsten 0x3Daa492eC75B9250807d9AEEe "FirstSmartContract"

main();