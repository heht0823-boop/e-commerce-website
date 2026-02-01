import CryptoJS from "crypto-js";

// 核心配置（保持不变）
const SECRET_KEY = CryptoJS.enc.Utf8.parse(import.meta.env.VITE_AES_SECRET_KEY);
const IV = CryptoJS.enc.Utf8.parse(import.meta.env.VITE_AES_IV);

/**
 * 增强版加密：支持字符串/对象加密
 * @param {string | object} data - 原始字符串或对象
 * @returns {string} 加密后的 Base64 字符串
 */
export function encryptData(data) {
  // 步骤1：统一转成字符串（对象→JSON字符串，字符串→原字符串）
  let strData = "";
  if (typeof data === "object" && data !== null) {
    try {
      strData = JSON.stringify(data);
    } catch (error) {
      console.error("对象转JSON失败：", error);
      return "";
    }
  } else if (typeof data === "string" && data) {
    strData = data;
  } else {
    console.error("加密失败：仅支持非空字符串或合法对象");
    return "";
  }

  // 步骤2：原加密逻辑
  try {
    const utf8Data = CryptoJS.enc.Utf8.parse(strData);
    const encrypted = CryptoJS.AES.encrypt(utf8Data, SECRET_KEY, {
      iv: IV,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });
    return encrypted.toString();
  } catch (error) {
    console.error("数据加密异常：", error);
    return "";
  }
}

/**
 * 增强版解密：支持还原字符串/对象
 * @param {string} encryptedData - 加密后的 Base64 字符串
 * @param {boolean} isParseJson - 是否解析为对象（默认true，传false返回字符串）
 * @returns {string | object} 解密后的原始数据（对象/字符串）
 */
export function decryptData(encryptedData, isParseJson = true) {
  // 步骤1：原参数校验和解密逻辑
  if (!encryptedData || typeof encryptedData !== "string") {
    console.error("解密失败：仅支持非空纯字符串格式");
    return "";
  }

  let decryptedStr = "";
  try {
    const decrypted = CryptoJS.AES.decrypt(encryptedData, SECRET_KEY, {
      iv: IV,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });
    decryptedStr = decrypted.toString(CryptoJS.enc.Utf8);
  } catch (error) {
    console.error("数据解密异常：", error);
    return "";
  }

  // 步骤2：根据需求还原为对象或返回字符串
  if (!isParseJson) {
    return decryptedStr; // 直接返回字符串
  }

  try {
    return JSON.parse(decryptedStr); // 转成对象
  } catch (error) {
    // 如果解析失败（说明原始数据是普通字符串），返回原字符串
    console.warn("解密结果非JSON格式，返回原始字符串：", error);
    return decryptedStr;
  }
}
