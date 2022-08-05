const lottary = artifacts.require("Lottary");

module.exports = function (deployer) {
  deployer.deploy(lottary);
};
