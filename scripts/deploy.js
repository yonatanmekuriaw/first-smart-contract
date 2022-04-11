const { ethers } = require("hardhat");

async function main (){
    const FirstSmartContract = await ethers.getContractFactory("FirstSmartContract");

    const first_contract = await FirstSmartContract.deploy("This is my first Smart Contract");
    console.log("Contract deployed to address:", first_contract.address);
}

main().then(
    ()=>process.exit(0)).catch(error=>{
        console.error(error);
        process.exit(1)
    })