// src/utils/debug.ts
export function logResponsiveInfo() {
  if (process.env.NODE_ENV === "development") {
    console.log("Screen width:", window.innerWidth);
    console.log(
      "Device type:",
      window.innerWidth < 768 ? "Mobile" : "PC", // 仅二端判断
    );
  }
}
