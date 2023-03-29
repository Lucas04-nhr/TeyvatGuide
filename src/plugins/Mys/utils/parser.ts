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
export function PostParser(data: string): Document {
	// Json 化
	let jsonData: PostStructuredContent[] = JSON.parse(data);
	// 创建 HTML 文档
	const doc = document.implementation.createHTMLDocument();
	// 遍历 Json 数据
	jsonData.forEach((item: any) => {
		if (typeof item.insert === "string") {
			const text = TextParser(item);
			doc.body.appendChild(text);
		} else if (item.insert.image) {
			const img = ImageParser(item);
			doc.body.appendChild(img);
		} else if (item.insert.vod) {
			// 创建 div
			const video = VideoParser(item);
			// 插入 div
			doc.body.appendChild(video);
		} else if (item.insert.backup_text) {
			// TODO: 折叠内容
		}
	});
	// doc 宽度设为 800,居中
	doc.body.style.width = "800px";
	doc.body.style.margin = "20px auto";
	return doc;
}

/**
 * @description 解析文本
 * @since Alpha
 * @param {PostStructuredContent} data Mys数据
 * @returns {HTMLSpanElement} 解析后的文本
 */
function TextParser(data: PostStructuredContent): HTMLSpanElement {
	// 检查数据
	if (typeof data.insert !== "string") {
		throw new Error("data.insert is not a string");
	}
	// 创建文本
	const text = document.createElement("span");
	// 设置文本属性
	if (data.attributes) {
		if (data.attributes.bold) text.style.fontWeight = "bold";
		if (data.attributes.color) text.style.color = data.attributes.color;
		if (data.attributes.link) {
			const a = document.createElement("a");
			a.href = data.attributes.link;
			a.target = "_blank";
			a.innerText = data.insert;
			return a;
		}
	}
	// 行间距
	text.style.lineHeight = "2";
	// 设置 span 内容
	text.innerText = data.insert;
	// 返回文本
	return text;
}

/**
 * @description 解析图片
 * @since Alpha
 * @param {PostStructuredContent} data Mys数据
 * @returns {HTMLDivElement} 解析后的图片
 */
function ImageParser(data: PostStructuredContent): HTMLDivElement {
	// 检查数据
	if (typeof data.insert === "string") {
		throw new Error("data.insert is a string");
	}
	if (!data.insert.image) {
		throw new Error("data.insert.image is not defined");
	}
	if (!data.attributes) {
		throw new Error("data.attributes is not defined");
	}
	if (!data.attributes.width) {
		throw new Error("data.attributes.width is not defined");
	}
	if (!data.attributes.height) {
		throw new Error("data.attributes.height is not defined");
	}
	const div = document.createElement("div");
	// 创建图片
	const img = document.createElement("img");
	img.src = data.insert.image;
	// 设置图片属性，窗口宽度 900，页面宽度 800
	img.style.height = "auto"; // 高度自适应
	img.width = 800; // 设置宽度
	// 判断是否是 cover
	if (data.attributes.width === 690 && data.attributes.height === 320) {
		// 添加 border-radius
		img.style.borderRadius = "10px";
	}
	// 插入图片
	div.appendChild(img);
	// 设置 div 属性
	div.style.display = "center"; // 居中
	div.style.margin = "20px auto"; // 设置 margin
	// 返回 div
	return div;
}

/**
 * @description 解析视频
 * @since Alpha
 * @param {PostStructuredContent} data Mys数据
 * @returns {HTMLDivElement} 解析后的视频
 */
function VideoParser(data: PostStructuredContent): HTMLDivElement {
	// 检查数据
	if (typeof data.insert === "string") {
		throw new Error("data.insert is a string");
	}
	if (!data.insert.vod) {
		throw new Error("data.insert.vod is not defined");
	}
	// 创建 div
	const div = document.createElement("div");
	// 创建视频
	const video = document.createElement("video");
	// 获取 resolutions中size最大的视频
	const resolution = data.insert.vod.resolutions.reduce((prev: any, curr: any) => {
		if (prev.size > curr.size) return prev;
		return curr;
	});
	// 设置视频属性
	video.poster = data.insert.vod.cover; // 设置封面
	video.width = 800; // 设置宽度
	video.height = 450; // 设置高度
	video.controls = true; // 设置 controls
	// 添加 source
	const source = document.createElement("source");
	source.src = resolution.url;
	source.type = resolution.format === ".mp4" ? "video/mp4" : "video/webm";
	// 插入 source
	video.appendChild(source);
	// 插入 video
	div.appendChild(video);
	// 设置 div 属性
	div.style.display = "center"; // 居中
	div.style.margin = "20px auto"; // 设置 margin
	// 返回 div
	return div;
}
