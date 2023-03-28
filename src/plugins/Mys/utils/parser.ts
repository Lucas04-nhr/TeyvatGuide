/**
 * @file plugins Mys utils PostParser.ts
 * @description 用于解析Mys数据的工具
 * @author BTMuli<bt-muli@outlook.com>
 * @since Alpha
 */

import { PostStructuredContent } from "../interface/post";

/**
 * @description 解析Mys数据
 * @param {string} data Mys数据
 * @description 为了安全考虑，不会解析所有的属性，只会解析几个常用的属性
 * @returns {Document} 解析后的 HTML 文档
 */
export function StructuredPostParser(data: string): Document {
	// Json 化
	let jsonData: PostStructuredContent[] = JSON.parse(data);
	// 创建 HTML 文档
	const doc = document.implementation.createHTMLDocument();
	// 遍历 Json 数据
	jsonData.forEach((item: any) => {
		if (item.insert.image) {
			// 创建 div
			const div = document.createElement("div");
			// 创建图片
			const img = document.createElement("img");
			img.src = item.insert.image;
			// 设置图片属性
			img.height = item.attributes.height; // 设置高度
			img.width = item.attributes.width; // 设置宽度
			// 如果宽度超过 800，将其设置为 800，图片自适应
			if (img.width > 800) img.width = 800;
			// 高度自适应
			img.style.height = "auto";
			// 插入图片
			div.appendChild(img);
			// 设置 div 属性
			div.style.display = "center"; // 居中
			div.style.margin = "20px auto"; // 设置 margin
			// 插入 div
			doc.body.appendChild(div);
		} else if (item.insert.vod) {
			// 创建 div
			const div = document.createElement("div");
			// 创建视频
			const video = document.createElement("video");
			// 获取最高分辨率的视频
			let resolution;
			// 获取 resolutions中definition="1080P"的视频
			resolution = item.insert.vod.resolutions.find(
				(resolution: any) => resolution.definition === "1080P"
			);
			if (!resolution) {
				// 如果没有找到，就获取720P的视频
				resolution = item.insert.vod.resolutions.find(
					(resolution: any) => resolution.definition === "720P"
				);
			}
			if (!resolution) {
				// 如果还是没有找到，就获取第一个
				resolution = item.insert.vod.resolutions[0];
			}
			// 设置一些属性
			video.poster = item.insert.vod.cover; // 设置封面
			video.width = resolution.width > 800 ? 800 : resolution.width; // 设置宽度（取最高分辨率的宽度）
			video.height = resolution.width > 800 ? 450 : resolution.height; // 设置高度（取最高分辨率的高度）
			video.controls = true; // 设置 controls
			// 添加 source
			const source = document.createElement("source");
			source.src = resolution.url;
			source.type = resolution.format === ".mp4" ? "video/mp4" : "video/webm";
			video.appendChild(source);
			// 添加 controls
			video.controls = true;
			// 插入 video
			div.appendChild(video);
			// 设置 div 属性
			div.style.display = "center"; // 居中
			div.style.margin = "20px auto"; // 设置 margin
			// 插入 div
			doc.body.appendChild(div);
		} else if (typeof item.insert === "string") {
			// 创建文本
			const text = document.createElement("span");
			// 设置文本属性
			// 创建 style string
			if (item.attributes) {
				let styleString = "";
				if (item.attributes.color) styleString += `color: ${item.attributes.color};`;
				// 设置 style
				text.style.cssText = styleString;
			}
			text.innerText = item.insert; // 设置文本
			// 插入文本
			doc.body.appendChild(text);
		}
	});
	// doc 宽度设为 800,居中
	doc.body.style.width = "800px";
	doc.body.style.margin = "20px auto";
	return doc;
}