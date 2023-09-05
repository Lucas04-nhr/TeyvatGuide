/**
 * @file plugins Mys request getEmojis.ts
 * @description Mys 表情包请求函数集合
 * @author BTMuli <bt-muli@outlook.com>
 * @since Beta v0.3.0
 */

// tauri
import { http } from "@tauri-apps/api";

/**
 * @description 获取表情包列表
 * @since Beta v0.3.0
 * @return {Promise<Record<string,string>|TGApp.BBS.Response.Base>}
 */
export async function getEmojis(): Promise<Record<string, string> | TGApp.BBS.Response.Base> {
  const url = "https://bbs-api-static.miyoushe.com/misc/api/emoticon_set";
  return await http.fetch<TGApp.Plugins.Mys.Emoji.Response>(url).then((res) => {
    if (res.data.retcode === 0) {
      const emojis: Record<string, string> = {};
      res.data.data.list.forEach((series) => {
        series.list.forEach((emoji) => {
          emojis[emoji.name] = emoji.icon;
        });
      });
      return emojis;
    }
    return res.data;
  });
}
