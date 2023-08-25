import YAML from 'yamljs'
import fs from 'fs-extra'
import path from 'node:path'
import {uuidv4,v4} from 'uuid'
import {app} from 'electron'
import axios from 'axios'
  // 启动路径
  let cmdPath = app.isPackaged?
  path.join(process.cwd(),"/resources/app.asar.unpacked/resources"):
  path.join(__dirname,"../../resources");
  let file = path.join(__dirname,"../../resources/config.yaml");

  let clashconfig;
  const uuid = v4();
function getConfig(){

  return {
  "external-controller":'127.0.0.1:56222',
  "secret":"518c9615-8b62-4f15-af0d-a14e7389acb3"
  }
}

function writeSub(suburl){
  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: suburl,
    headers: {
      'user-agent': 'Netboard-Clash/0.0.1',
    }
  };

  axios.request(config)
  .then((response) => {
    clashconfig = YAML.parse(response.data);
    clashconfig['external-controller'] = '127.0.0.1:56222';
    clashconfig['mixed-port'] = 17890;
    // clashconfig['secret'] = "518c9615-8b62-4f15-af0d-a14e7389acb3";
    fs.writeFileSync(path.join(cmdPath,"config.yaml"),YAML.stringify(clashconfig));
  })

}

export {
  getConfig,
  writeSub
}
