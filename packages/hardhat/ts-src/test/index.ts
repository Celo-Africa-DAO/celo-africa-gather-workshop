import { expect } from "chai";
import { ethers } from "hardhat";

describe("Counter", function () {
  it("should initialize with zero", async function () {
    const Counter = await ethers.getContractFactory("Counter");
    const counter = await Counter.deploy();
    await counter.waitForDeployment();
    expect(await counter.number()).to.equal(0);
  });

  it("should set the number", async function () {
    const Counter = await ethers.getContractFactory("Counter");
    const counter = await Counter.deploy();
    await counter.waitForDeployment(); 

    await counter.setNumber(42);
    expect(await counter.number()).to.equal(42);
  });

  it("should increment the number", async function () {
    const Counter = await ethers.getContractFactory("Counter");
    const counter = await Counter.deploy();
    await counter.waitForDeployment();
    await counter.setNumber(42);
    await counter.increment();
    expect(await counter.number()).to.equal(43);
  });
});
  