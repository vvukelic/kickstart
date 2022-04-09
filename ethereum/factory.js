import web3 from "./web3";
import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
    JSON.parse(CampaignFactory.interface),
    '0x99550BA4ED14Ff01C802a284E621Af715B2Ba9b5'
);

export default instance;
