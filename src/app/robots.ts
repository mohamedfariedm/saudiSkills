import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        disallow: "/",
      },

      {
        userAgent: "*",
        allow: "/OneSignalSDKWorker.js",
      },
    ],
    //sitemap: "https://app.advix.ai/sitemap.xml", // Optional: add if you have a sitemap
  };
}
