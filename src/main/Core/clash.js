import { platform, arch } from "node:process";

const CLASH_STORAGE_PREFIX = "https://release.dreamacro.workers.dev/";
const CLASH_URL_PREFIX =
  "https://ghproxy.com/https://github.com/Dreamacro/clash/releases/download/premium/";
const CLASH_LATEST_DATE = "2023.07.22";
const SIDECAR_HOST = "netboard";
const CLASH_MAP = {
  "win32-x64": "clash-windows-amd64",
  "darwin-x64": "clash-darwin-amd64",
  "darwin-arm64": "clash-darwin-arm64",
  "linux-x64": "clash-linux-amd64",
  "linux-arm64": "clash-linux-armv8",
};
function clash() {
	const name = CLASH_MAP[`${platform}-${arch}`];
	if (!CLASH_MAP[`${platform}-${arch}`]) {
	  throw new Error(`clash unsupported platform "${platform}-${arch}"`);
	}
	const isWin = platform === "win32";
	const urlExt = isWin ? "zip" : "gz";
	const downloadURL = `${CLASH_URL_PREFIX}${name}-${CLASH_LATEST_DATE}.${urlExt}`;
	const exeFile = `${name}${isWin ? ".exe" : ""}`;
	const zipFile = `${name}.${urlExt}`;
	console.log(downloadURL);
	return {
		name: "clash",
		targetFile: `clash-${SIDECAR_HOST}${isWin ? ".exe" : ""}`,
		exeFile,
		zipFile,
		downloadURL,
	};
}
function clashS3() {
	const name = CLASH_MAP[`${platform}-${arch}`];
	if (!CLASH_MAP[`${platform}-${arch}`]) {
	  throw new Error(`clash unsupported platform "${platform}-${arch}"`);
	}
	const isWin = platform === "win32";
	const urlExt = isWin ? "zip" : "gz";
	const downloadURL = `${CLASH_STORAGE_PREFIX}${CLASH_LATEST_DATE}/${name}-${CLASH_LATEST_DATE}.${urlExt}`;
	const exeFile = `${name}${isWin ? ".exe" : ""}`;
	const zipFile = `${name}.${urlExt}`;
console.log(downloadURL);
	return {
		name: "clash",
		targetFile: `clash-${SIDECAR_HOST}${isWin ? ".exe" : ""}`,
		exeFile,
		zipFile,
		downloadURL,
	};
}
export default{
	clash,
	clashS3
}
