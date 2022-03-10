import web3 from "./web3";
import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
    JSON.parse(CampaignFactory.interface),
    '0x9344E0D2a5A0264b2611ab960eD732c5957b8937'
);

export default instance;
