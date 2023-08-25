import { platform, arch } from "node:process";
const META_URL_PREFIX = `https://ghproxy.com/https://github.com/MetaCubeX/Clash.Meta/releases/download/`;
const META_VERSION = "v1.15.1";
const SIDECAR_HOST = "netboard";
const META_MAP = {
  "win32-x64": "clash.meta-windows-amd64-compatible",
  "darwin-x64": "clash.meta-darwin-amd64",
  "darwin-arm64": "clash.meta-darwin-arm64",
  "linux-x64": "clash.meta-linux-amd64-compatible",
  "linux-arm64": "clash.meta-linux-arm64",
};
function clashMeta() {
  const name = META_MAP[`${platform}-${arch}`];
  if (!META_MAP[`${platform}-${arch}`]) {
    throw new Error(`clash meta unsupported platform "${platform}-${arch}"`);
  }
  const isWin = platform === "win32";
  const urlExt = isWin ? "zip" : "gz";
  const downloadURL = `${META_URL_PREFIX}${META_VERSION}/${name}-${META_VERSION}.${urlExt}`;
  const exeFile = `${name}${isWin ? ".exe" : ""}`;
  const zipFile = `${name}-${META_VERSION}.${urlExt}`;

  return {
    name: "clash-meta",
    targetFile: `clash-meta-${SIDECAR_HOST}${isWin ? ".exe" : ""}`,
    exeFile,
    zipFile,
    downloadURL,
  };
}
	
export default{
	clashMeta
}