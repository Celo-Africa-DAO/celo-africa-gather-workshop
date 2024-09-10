import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";



const MundoContract = buildModule("Mundo", (m) => {
  

  const mundo = m.contract("Mundo")

  return { mundo };
});

export default MundoContract;