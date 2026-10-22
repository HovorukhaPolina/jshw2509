import { db } from "./db.js";

// Создаем категории и сохраняем их результаты, чтобы использовать их реальные ID
const electronics = await db.orm.public.Category.create({
    name: "Electronics",
});

const accessories = await db.orm.public.Category.create({
    name: "Accessories",
});

const clothing = await db.orm.public.Category.create({
    name: "Clothing",
});

const home = await db.orm.public.Category.create({
    name: "Home & Kitchen",
});

console.log("Categories created");

// Создаем 10 товаров, привязывая их к категориям через categoryId
await db.orm.public.Post.create({
    name: "Smartphone X",
    content: "Latest model with advanced features",
    authorId: 1,
    categoryId: electronics.id,
});

await db.orm.public.Post.create({
    name: "Wireless Headphones",
    content: "Noise-cancelling over-ear headphones",
    authorId: 2,
    categoryId: electronics.id,
});

await db.orm.public.Post.create({
    name: "Smart Watch",
    content: "Advanced smartwatch with health monitoring",
    authorId: 3,
    categoryId: electronics.id,
});

await db.orm.public.Post.create({
    name: "Leather Wallet",
    content: "Genuine leather wallet with multiple card slots",
    authorId: 4,
    categoryId: accessories.id,
});

await db.orm.public.Post.create({
    name: "Classic Sunglasses",
    content: "Timeless design with UV protection",
    authorId: 5,
    categoryId: accessories.id,
});

await db.orm.public.Post.create({
    name: "Canvas Backpack",
    content: "Spacious backpack for everyday use",
    authorId: 6,
    categoryId: accessories.id,
});

await db.orm.public.Post.create({
    name: "Basic Cotton T-Shirt",
    content: "Comfortable and stylish t-shirt",
    authorId: 7,
    categoryId: clothing.id,
});

await db.orm.public.Post.create({
    name: "Slim Fit Jeans",
    content: "Slim fit jeans for a modern look",
    authorId: 8,
    categoryId: clothing.id,
});

await db.orm.public.Post.create({
    name: "Automatic Coffee Maker",
    content: "Automatic coffee maker with timer",
    authorId: 9,
    categoryId: home.id,
});

await db.orm.public.Post.create({
    name: "Kitchen Blender",
    content: "High-powered kitchen blender for smoothies and more",
    authorId: 9,
    categoryId: home.id,
});

console.log("Products created successfully");