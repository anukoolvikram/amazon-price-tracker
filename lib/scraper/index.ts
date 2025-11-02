"use server";
//Used ScraperAPI for the scraping

import axios from "axios";
import * as cheerio from "cheerio";
import { extractCurrency, extractDescription, extractPrice } from "../utils/utils";


export async function scrapeAmazonProduct(url: string) {
  if (!url) return;
  const apiKey = String(process.env.SCRAPERAPI_KEY);

  // We pass the Amazon URL as a parameter to ScraperAPI's endpoint
  const requestUrl = `http://api.scraperapi.com?api_key=${apiKey}&url=${encodeURIComponent(
    url
  )}`;

  try {
    const response = await axios.get(requestUrl); //http request to ScraperAPI
    const $ = cheerio.load(response.data); // ScraperAPI returns the HTML of the Amazon page

    const title = $("#productTitle").text().trim();
    if (!title) {
      throw new Error("Product title not found. Page may be blocked or layout changed.");
    }

    const currentPrice = extractPrice(
      $(".priceToPay span.a-price-whole"),
      $(".a.size.base.a-color-price"),
      $(".a-button-selected .a-color-base")
    );

    const originalPrice = extractPrice(
      $("#priceblock_ourprice"),
      $(".a-price.a-text-price span.a-offscreen"),
      $("#listPrice"),
      $("#priceblock_dealprice"),
      $(".a-size-base.a-color-price")
    );

    const outOfStock =
      $("#availability span").text().trim().toLowerCase() ===
      "currently unavailable";

    const images =
      $("#imgBlkFront").attr("data-a-dynamic-image") ||
      $("#landingImage").attr("data-a-dynamic-image") ||
      "{}";

    const imageUrls = Object.keys(JSON.parse(images));
    const image = imageUrls.length > 0 ? imageUrls[0] : null;

    const currency = extractCurrency($(".a-price-symbol"));
    const discountRate = $(".savingsPercentage").text().replace(/[-%]/g, "");
    const description = extractDescription($);

    const data = {
      url,
      currency: currency || "$",
      image: image,
      title,
      currentPrice: Number(currentPrice) || Number(originalPrice),
      originalPrice: Number(originalPrice) || Number(currentPrice),
      priceHistory: [],
      discountRate: Number(discountRate),
      isOutOfStock: outOfStock,
      description,
      lowestPrice: Number(currentPrice) || Number(originalPrice),
      highestPrice: Number(originalPrice) || Number(currentPrice),
      averagePrice: Number(currentPrice) || Number(originalPrice),
      category: null,
      reviewsCount: 0,
      stars: 0,
    };

    return data;
  } catch (error: any) {
    throw new Error(`Failed to scrape product (${url}): ${error.message}`);
  }
}