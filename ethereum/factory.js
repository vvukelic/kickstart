import web3 from "./web3";
import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
    JSON.parse(CampaignFactory.interface),
    '0x893f544c791c4A66e85aDa86ccd3dfc4d9BDBE2E'
);

export default instance;
