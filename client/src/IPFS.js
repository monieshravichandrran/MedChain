import { create } from "ipfs-http-client";

const IPFS = create({
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https",
});

export default IPFS;