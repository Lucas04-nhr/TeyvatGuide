/**
 * @file web request verifyLToken.ts
 * @description 验证 stoken 的请求函数
 * @author BTMuli<bt-muli@outlook.com>
 * @since Alpha v0.2.0
 */

// tauri
import { http } from "@tauri-apps/api";
// api
import TGApi from "../api/TGApi";
// utils
import TGUtils from "../utils/TGUtils";

/**
 * @description 验证 ltoken 有效性，返回 mid
 * @since Alpha v0.2.0
 * @param {string} ltoken ltoken
 * @param {string} ltuid 登录用户 uid
 * @returns {Promise<string | BTMuli.Genshin.Base.Response>}
 */
export async function verifyLToken (ltoken: string, ltuid: string): Promise<string | BTMuli.Genshin.Base.Response> {
  const url = TGApi.GameTokens.verifyLToken;
  const cookie = {
    ltoken,
    ltuid,
  };
  const data = { ltoken };
  const header = TGUtils.User.getHeader(cookie, "POST", data, "common");
  console.log("header:", header);
  return await http.fetch<BTMuli.User.Response.Verify>(url, {
    method: "POST",
    headers: header,
    body: http.Body.json(data),
  }).then((res) => {
    if (res.data.retcode !== 0) return res.data;
    return res.data.data.user_info.mid;
  });
}