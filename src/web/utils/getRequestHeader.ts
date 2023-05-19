/**
 * @file web utils getRequestHeader.ts
 * @description 获取请求头
 * @author BTMuli<bt-muli@outlook.com>
 * @since Alpha v0.2.0
 */

// Node
import md5 from "js-md5";
import qs from "qs";
// Tauri.Genshin
import TGConstant from "../constant/TGConstant";

/**
 * @description 获取 salt
 * @since Alpha v0.2.0
 * @version 2.49.1
 * @param {string} saltType salt 类型
 * @returns {string} salt
 */
function getSalt (saltType: string) {
  switch (saltType) {
    case "common":
      return TGConstant.Salt.Other.X4;
    case "prod":
      return TGConstant.Salt.Other.prod;
    default:
      return TGConstant.Salt.Other.X4;
  }
}

/**
 * @description 获取随机数
 * @since Alpha v0.2.0
 * @param {number} min 最小值
 * @param {number} max 最大值
 * @returns {number} 随机数
 */
function random (min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

/**
 * @description 获取 ds
 * @since Alpha v0.2.0
 * @version 2.49.1
 * @param {string} saltType salt 类型
 * @param {string} method 请求方法
 * @param {string} data 请求数据
 * @returns {string} ds
 */
function getDS (method: string, data: string, saltType: string): string {
  const salt = getSalt(saltType);
  const params = {
    salt,
    t: Math.floor(Date.now() / 1000).toString(),
    r: random(100000, 200000).toString(),
    b: method === "GET" ? "" : data,
    q: method === "GET" ? data : "",
  };
  const md5Str = md5.update(qs.stringify(params)).hex();
  return `${params.t},${params.r},${md5Str}`;
}

/**
 * @description 获取请求头
 * @since Alpha v0.2.0
 * @param {string} cookie cookie
 * @param {string} method 请求方法
 * @param {string} data 请求数据
 * @param {string} saltType salt 类型
 * @returns {Record<string, string>} 请求头
 */
export function getRequestHeader (cookie: string, method: string, data: string, saltType: string): Record<string, string> {
  return {
    "User-Agent": TGConstant.BBS.USER_AGENT,
    "x-rpc-app_version": TGConstant.BBS.VERSION,
    "x-rpc-client_type": "5",
    Referer: "https://webstatic.mihoyo.com/",
    DS: getDS(method, data, saltType),
    Cookie: cookie,
  };
}
