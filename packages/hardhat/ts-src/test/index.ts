import { expect } from "chai";
import { ethers } from "hardhat";
import { BigNumberish, ContractRunner } from "ethers";
import hre from "hardhat";
import  {loadFixture, } from"@nomicfoundation/hardhat-toolbox/network-helpers";
import '@nomiclabs/hardhat-ethers'
import { Item,items } from "../data-types";

describe("Mundo Token Contract",()=>{
async function diployFixture(){
    const [owner, otherAccount1, otherAccount2] = await ethers.getSigners();
    const MundoContract = await  ethers.deployContract("Mundo")
    const MockERC20 = await  ethers.deployContract("MockERC20")
    //mint erc20 for owner and addresses 
    await MockERC20.mint(owner.address)
    await MockERC20.mint(otherAccount1.address)
    await MockERC20.mint(otherAccount2.address)
    await MundoContract.connect(owner).addToken(MockERC20)
   

    //return  all the data you want
    return {owner,otherAccount1,otherAccount2,MundoContract,MockERC20}
}
async function listItems(){
    const {MundoContract,otherAccount1,MockERC20,owner} = await loadFixture(diployFixture)
    const item1:Item = items[0]; // get the first item from the items object
   
    await MundoContract.connect(owner).list(item1._name,item1._category,item1._image,item1._cost,item1._rating,item1._stock,item1._description)
}
async function approve(caller:ContractRunner,sender :string,amount:BigNumberish){
    const {MundoContract,otherAccount1,MockERC20,owner} = await loadFixture(diployFixture)
    await MockERC20.connect(caller).approve(sender,amount)

}

it("It should deploy the contract",async()=>{
    const {MundoContract} = await loadFixture(diployFixture);
    console.log(await MundoContract.getAddress())

    expect(await MundoContract.getAddress()).to.be.properAddress;

})
it("It should mint erc20 tokens",async()=>{
    const {MockERC20,owner} = await loadFixture(diployFixture);
    const amount = ethers.parseEther("1000");
    
    expect(await MockERC20.balanceOf(owner.address)).to.be.equal(amount)
})

it("It should list an item",async()=>{
    const {MundoContract,otherAccount1,owner} = await loadFixture(diployFixture);
    const item1:Item = items[0]; // get the first item from the items object
   
   await listItems()
   

    expect((await MundoContract.items(0)).id).to.equal(item1._id);


})

it("It Should AddToken Address",async()=>{
    const {MundoContract,MockERC20,owner} = await loadFixture(diployFixture)
    
    expect(await MundoContract.checkAllowedTokens(MockERC20)).to.equal(true)

})

// add for buying of items

//get all items

//get all user orders



})

