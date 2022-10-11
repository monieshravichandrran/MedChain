import Web3 from "web3";

let web3;

if (typeof window !== "undefined" && typeof window.web3 !== "undefined") {
    // We are in the browser and metamask is running.
    web3 = new Web3(window.web3.currentProvider);
    console.log(web3);
} else {
    // We are on the server *OR* the user is not running metamask
    const provider = new Web3.providers.HttpProvider(
        "https://rinkeby.infura.io/v3/8a744bdae4914dbdbe50c5375671899d"
    );
    web3 = new Web3(provider);
    console.log(web3);
}
export default web3;
