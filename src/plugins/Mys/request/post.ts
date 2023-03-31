/**
 * @file plugins Mys request post.ts
 * @description Mys帖子请求
 * @author BTMuli<bt-muli@outlook.com>
 * @since Alpha
 */

import { http } from "@tauri-apps/api";
import { PostResponse, PostData } from "../interface/post";

// 帖子 API
const POST_API = "https://bbs-api.mihoyo.com/post/wapi/getPostFull?gids=2&post_id={post_id}";
const POST_REFERER = "https://bbs.mihoyo.com/ys/article/{post_id}";

/**
 * @description 获取帖子信息
 * @since Alpha
 * @param {number} post_id 帖子 ID
 * @return {Promise<PostData>}
 */
export async function getPostData(post_id: number): Promise<PostData> {
	return await http
		.fetch<PostResponse>(POST_API.replace("{post_id}", post_id.toString()), {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Referer: POST_REFERER.replace("{post_id}", post_id.toString()),
			},
		})
		.then(res => {
			return res.data.data.post;
		});
}