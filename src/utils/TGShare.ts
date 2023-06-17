/**
 * @file utils TGShare.ts
 * @description 生成分享截图并保存到本地
 * @author BTMuli <bt-muli@outlook.com>
 * @since Alpha v0.2.0
 */

// tauri
import { dialog, fs, http } from "@tauri-apps/api";
import html2canvas from "html2canvas";

/**
 * @description 保存图片-canvas
 * @since Alpha v0.2.0
 * @param {HTMLCanvasElement} canvas - canvas元素
 * @param {string} filename - 文件名
 * @returns {Promise<void>} 无返回值
 */
async function saveCanvasImg (canvas: HTMLCanvasElement, filename: string): Promise<void> {
  const buffer = new Uint8Array(atob(canvas.toDataURL("image/png").split(",")[1]).split("").map((item) => item.charCodeAt(0)));
  await dialog.save({
    defaultPath: filename,
    filters: [{ name: "图片", extensions: ["png"] }],
  }).then(async (res) => {
    if (res === null) return;
    await fs.writeBinaryFile({
      path: res,
      contents: buffer,
    });
  });
}

/**
 * @description 将图片保存到本地
 * @since Alpha v0.2.0
 * @param {string} url - 图片链接
 * @returns {Promise<string>} 图片元素
 */
export async function saveImgLocal (url: string): Promise<string> {
  return await http.fetch<ArrayBuffer>(url, {
    method: "GET",
    responseType: http.ResponseType.Binary,
  }).then(async (res) => {
    const buffer = new Uint8Array(res.data);
    const blob = new Blob([buffer], { type: "image/png" });
    return URL.createObjectURL(blob);
  });
}

/**
 * @description 获取分享截图背景色
 * @since Alpha v0.2.0
 * @returns {string} 背景色
 */
function getShareImgBgColor (): string {
  let theme = localStorage.getItem("theme");
  if (theme) {
    theme = JSON.parse(theme).theme;
  }
  if (theme === "dark") {
    return "#2c2c2c";
  } else {
    return "#ece5d8";
  }
}

/**
 * @description 生成分享截图
 * @since Alpha v0.2.0
 * @param {string} fileName - 文件名
 * @param {HTMLElement} element - 元素
 * @param {number} scale - 缩放比例
 * @returns {Promise<void>} 无返回值
 */
export async function generateShareImg (fileName: string, element: HTMLElement, scale: number = 1.2): Promise<void> {
  const canvas = document.createElement("canvas");
  const width = element.clientWidth + 50;
  const height = element.clientHeight + 50;
  canvas.width = width * scale;
  canvas.height = height * scale;
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;
  canvas.getContext("2d")?.scale(scale, scale);
  const opts = {
    backgroundColor: getShareImgBgColor(),
    windowHeight: height,
    width,
    height,
    useCORS: true,
    canvas,
    x: -15,
    y: -15,
  };
  const canvasData = await html2canvas(element, opts);
  await saveCanvasImg(canvasData, fileName);
}