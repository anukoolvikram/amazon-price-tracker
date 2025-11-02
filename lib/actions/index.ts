"use server"

import { revalidatePath } from "next/cache";
import Product from "../database/models/product.model";
import { connectToDB } from "../database/mongoose";
import { scrapeAmazonProduct } from "../scraper";
import { getAveragePrice, getHighestPrice, getLowestPrice } from "../utils/utils";
import { User } from "@/types";
import { generateEmailBody, sendEmail } from "../nodemailer";
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';


interface GetProductsParams {
  filter?: string;
  category?: string;
  search?: string;
  sort?: string;
}

const serializeData = (data: any) => {
  if (!data) return null;
  if (data._id) {
    const plainObject = JSON.parse(JSON.stringify(data));
    if (plainObject._id && typeof plainObject._id === 'object') {
      plainObject._id = data._id.toString();
    }
    return plainObject;
  }
  if (Array.isArray(data)) {
    return data.map(item => JSON.parse(JSON.stringify(item)));
  }
  return data;
}

export async function scrapeAndStoreProduct(productUrl: string) {
  if(!productUrl) return;
  const session = await getServerSession(authOptions);
  if (!session || !session.user || !session.user.email) {
    throw new Error("You must be logged in to track a product.");
  }
  const userEmail = session.user.email;

  try {
    connectToDB();
    const scrapedProduct = await scrapeAmazonProduct(productUrl);
    if(!scrapedProduct) return;
    let product = scrapedProduct;

    const existingProduct = await Product.findOne({ url: scrapedProduct.url });
    if(existingProduct) {
      const updatedPriceHistory: any = [
        ...existingProduct.priceHistory,
        { price: scrapedProduct.currentPrice }
      ]
      product = {
        ...scrapedProduct,
        priceHistory: updatedPriceHistory,
        lowestPrice: getLowestPrice(updatedPriceHistory),
        highestPrice: getHighestPrice(updatedPriceHistory),
        averagePrice: getAveragePrice(updatedPriceHistory),
      }
    }

    const newProduct = await Product.findOneAndUpdate(
      { url: scrapedProduct.url },
      product,
      { upsert: true, new: true }
    );

    await addUserEmailToProduct(newProduct._id.toString(), userEmail, newProduct);
    revalidatePath(`/products/${newProduct._id}`);
    revalidatePath(`/products`);
    return serializeData(newProduct);
  } catch (error: any) {
    throw new Error(`Failed to create/update product: ${error.message}`)
  }
}

export async function getProductById(productId: string) {
  try {
    connectToDB();
    const product = await Product.findOne({ _id: productId }).lean();
    if(!product) return null;
    return serializeData(product);
  } catch (error) {
    console.log(error);
  }
}

export async function getTrendingProductsCount() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) return 0;
  const userEmail = session.user.email;

  try {
    connectToDB();
    const count = await Product.countDocuments({ 
      'users.email': userEmail,
      priceHistory: { $exists: true, $ne: [], $not: { $size: 1 } }
    });
    return count;
  } catch (error) {
    console.log(error);
    return 0;
  }
}

export async function getTotalProductsCount() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) return 0;
  const userEmail = session.user.email;

  try {
    connectToDB();
    const count = await Product.countDocuments({
      'users.email': userEmail 
    });
    return count;
  } catch (error) {
    console.log(error);
    return 0;
  }
}

export async function getMyTrackedProducts(params: GetProductsParams = {}) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user || !session.user.email) {
    return []; 
  }
  const userEmail = session.user.email;

  try {
    connectToDB();
    const { filter, category, search, sort } = params;
    const query: any = {
      'users.email': userEmail 
    };

    if (filter === 'trending') {
      query.priceHistory = { $exists: true, $ne: [], $not: { $size: 1 } };
    }
    if (category) {
      query.category = { $regex: new RegExp(category, 'i') };
    }
    if (search) {
      query.$or = [
        { title: { $regex: new RegExp(search, 'i') } },
        { category: { $regex: new RegExp(search, 'i') } }
      ];
    }
    
    const sortOptions: any = {};
    if (sort === 'price-drop') {
      sortOptions.highestPrice = -1;
    } else if (sort === 'price-low-high') {
      sortOptions.currentPrice = 1;
    } else if (sort === 'price-high-low') {
      sortOptions.currentPrice = -1;
    } else if (sort === 'newest') {
      sortOptions.createdAt = -1;
    } else {
      sortOptions.createdAt = -1;
    }
    
    const products = await Product.find(query).sort(sortOptions).lean();
    return serializeData(products);
  } catch (error) {
    console.log(error);
    return []; 
  }
}

export async function getAllProducts() {
  try {
    connectToDB();
    const products = await Product.find()
      .sort({ updatedAt: -1 })
      .limit(50) 
      .lean(); 
      
    return serializeData(products);
  } catch (error) {
    console.log(error);
  }
}

export async function getSimilarProducts(productId: string) {
  try {
    connectToDB();
    const currentProduct = await Product.findById(productId);
    if(!currentProduct) return null;
    
    const similarProducts = await Product.find({
      _id: { $ne: productId },
      category: currentProduct.category, 
    }).limit(4).lean(); 
    
    return serializeData(similarProducts);
  } catch (error) {
    console.log(error);
  }
}

export async function addUserEmailToProduct(
  productId: string, 
  userEmail: string,
  productObj?: any 
) {
  try {
    const product = productObj || await Product.findById(productId);
    if(!product) return;
    const userExists = product.users.some((user: User) => user.email === userEmail);
    if(!userExists) {
      product.users.push({ email: userEmail });
      await product.save();
      const emailContent = await generateEmailBody(product, "WELCOME");
      await sendEmail(emailContent, [userEmail]);
    }
  } catch (error) {
    console.log(error);
  }
}