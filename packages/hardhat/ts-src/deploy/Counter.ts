import { DeployFunction } from "hardhat-deploy/types";

const func: DeployFunction = async function ({
  getNamedAccounts,
  deployments,
}) {
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();

  await deploy("Counter", {
    from: deployer,
    args: [],
    waitConfirmations: 1,
    log: true,
  });
};

func.tags = ["Counter"];

export default func;
