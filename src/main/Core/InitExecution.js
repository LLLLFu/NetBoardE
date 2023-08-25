/*
 * copy from https://github.com/zzzgydi/clash-verge/blob/main/scripts/check.mjs
 * thank this great pjoject
*/
import fs from "fs-extra";
import zlib from "zlib";
import path from "path";
import AdmZip from "adm-zip";
import fetch from "node-fetch";
import { execSync } from "child_process";
import process from 'process'
import axios from 'axios'
import {clash,clashS3} from './clash.js'
import {clashMeta} from "./clash-meta.js"


const FORCE = process.argv.includes("--force");
async function resolveSidecar(binInfo) {
  const { name, targetFile, zipFile, exeFile, downloadURL } = binInfo;

  const sidecarDir = path.join(process.cwd(), "sidecar");
  const TEMP_DIR = path.join(process.cwd(), "temp");
  const sidecarPath = path.join(sidecarDir, targetFile);

  await fs.mkdirp(sidecarDir,0o755);
  await fs.chmodSync(sidecarDir, '755');
  if (!FORCE && (await fs.pathExists(sidecarPath))) return;

  const tempDir = path.join(TEMP_DIR, name);
  const tempZip = path.join(tempDir, zipFile);
  const tempExe = path.join(tempDir, exeFile);

  await fs.mkdirp(tempDir,0o755);
  await fs.chmodSync(tempDir, '755');
  try {
    if (!(await fs.pathExists(tempZip))) {
      await downloadFile(downloadURL, tempZip);
    }

    if (zipFile.endsWith(".zip")) {
      const zip = new AdmZip(tempZip);
      zip.getEntries().forEach((entry) => {
        console.log(`[DEBUG]: "${name}" entry name`, entry.entryName);
      });
      zip.extractAllTo(tempDir, true);
      await fs.rename(tempExe, sidecarPath);
      console.log(`[INFO]: "${name}" unzip finished`);
    } else {
      // gz
      const readStream = fs.createReadStream(tempZip);
      const writeStream = fs.createWriteStream(sidecarPath);
      await new Promise((resolve, reject) => {
        const onError = (error) => {
          console.error(`[ERROR]: "${name}" gz failed:`, error.message);
          reject(error);
        };
        readStream
          .pipe(zlib.createGunzip().on("error", onError))
          .pipe(writeStream)
          .on("finish", () => {
            console.log(`[INFO]: "${name}" gunzip finished`);
            execSync(`chmod 755 ${sidecarPath}`);
            console.log(`[INFO]: "${name}" chmod binary finished`);
            resolve();
          })
          .on("error", onError);
      });
    }
  } catch (err) {
    // 需要删除文件
    await fs.remove(sidecarPath);
    throw err;
  } finally {
    // delete temp dir
    await fs.remove(tempDir);
  }
}
/**
 * prepare clash core
 * if the core version is not updated in time, use S3 storage as a backup.
 */
async function resolveClash() {
  try {
    return await resolveSidecar(clash());
  } catch {
    console.log(`[WARN]: clash core needs to be updated`);
    return await resolveSidecar(clashS3()).catch((e)=>{console.log(e)});
  }
}

/**
 * only Windows
 * get the wintun.dll (not required)
 */
async function resolveWintun() {
  const { platform } = process;
  const TEMP_DIR = path.join(process.cwd(), "temp");
  if (platform !== "win32") return;

  const url = "https://www.wintun.net/builds/wintun-0.14.1.zip";

  const tempDir = path.join(TEMP_DIR, "wintun");
  const tempZip = path.join(tempDir, "wintun.zip");

  const wintunPath = path.join(tempDir, "wintun/bin/amd64/wintun.dll");
  const targetPath = path.join(process.cwd(), "/resources", "wintun.dll");

  if (!FORCE && (await fs.pathExists(targetPath))) return;

  await fs.mkdirp(tempDir,0o755);
  await fs.chmodSync(tempDir, '755');

  if (!(await fs.pathExists(tempZip))) {
    await downloadFile(url, tempZip);
  }

  // unzip
  const zip = new AdmZip(tempZip);
  zip.extractAllTo(tempDir, true);

  if (!(await fs.pathExists(wintunPath))) {
    throw new Error(`path not found "${wintunPath}"`);
  }

  await fs.rename(wintunPath, targetPath);
  await fs.remove(tempDir);

  console.log(`[INFO]: resolve wintun.dll finished`);
}
/**
 * download the file to the resources dir
 */
async function resolveResource(binInfo) {
  const { file, downloadURL } = binInfo;

  const resDir = path.join(process.cwd(), "resources");
  const targetPath = path.join(resDir, file);

  if (!FORCE && (await fs.pathExists(targetPath))) return;

  await fs.mkdirp(resDir,0o755);
  await fs.chmodSync(resDir, '755');
  await downloadFile(downloadURL, targetPath);

  console.log(`[INFO]: ${file} finished`);
}

/**
 * download file and save to `path`
 */
const downloadFile = async (url, path) => {
	const httpProxy =
	  process.env.HTTP_PROXY ||
	  process.env.http_proxy ||
	  process.env.HTTPS_PROXY ||
	  process.env.https_proxy;
  const writer = fs.createWriteStream(path, { mode: 0o755 });

  const response = await axios({
    url:url,
    method: 'GET',
    responseType: 'stream',
	proxy: {
		protocol: 'http',
		host: httpProxy.split(":")[0],
		port: httpProxy.split(":")[1],
		auth: {
		  username: '',
		  password: ''
		}
	  },
  });

  response.data.pipe(writer);
 console.log(`[INFO]: download finished "${url}"`);
  return new Promise((resolve, reject) => {
    writer.on('finish', resolve);
    writer.on('error', reject);
  });
};


const resolveMmdb = () =>
  resolveResource({
    file: "Country.mmdb",
    downloadURL: `https://github.com/Dreamacro/maxmind-geoip/releases/download/20230712/Country.mmdb`,
  });
const resolveGeosite = () =>
  resolveResource({
    file: "geosite.dat",
    downloadURL: `https://github.com/MetaCubeX/meta-rules-dat/releases/download/latest/geosite.dat`,
  });
const resolveGeoIP = () =>
  resolveResource({
    file: "geoip.dat",
    downloadURL: `https://github.com/MetaCubeX/meta-rules-dat/releases/download/latest/geoip.dat`,
  }).catch((e)=>{
	  console.log(e);
  });
const tasks = [
  { name: "clash", func: resolveClash, retry: 5 },
  { name: "clash-meta", func: () => resolveSidecar(clashMeta()), retry: 5 },
  { name: "wintun", func: resolveWintun, retry: 5, winOnly: true },
  { name: "service", func: resolveService, retry: 5, winOnly: true },
  { name: "install", func: resolveInstall, retry: 5, winOnly: true },
  { name: "uninstall", func: resolveUninstall, retry: 5, winOnly: true },
  { name: "mmdb", func: resolveMmdb, retry: 5 },
  { name: "geosite", func: resolveGeosite, retry: 5 },
  { name: "geoip", func: resolveGeoIP, retry: 5 },
];

async function runTask() {
  const task = tasks.shift();
  if (!task) return;
  if (task.winOnly && process.platform !== "win32") return runTask();

  for (let i = 0; i < task.retry; i++) {
    try {
      await task.func();
      break;
    } catch (err) {
      console.error(`[ERROR]: task::${task.name} try ${i} ==`, err.message);
      if (i === task.retry - 1) throw err;
    }
  }
  return runTask();
}

export default {
	runTask
}
