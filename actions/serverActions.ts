"use server"

import { revalidateTag } from 'next/cache';
import { Product } from '../typings';

export const addProductToDatabase = async (e: FormData) => {
  //! server actions => same api folder server
 // "use server"
  const product = e.get('product')?.toString();
  const price = e.get('price')?.toString();

  if (!product || !price) return;

  const newProduct: Product = {
    product,
    price,
  };

  await fetch('https://64f97ee04098a7f2fc14801a.mockapi.io/products', {
    method: 'POST',
    body: JSON.stringify(newProduct),
    headers: {
      'content-type': 'application/json',
    },
  });

  // ! immediate update
  revalidateTag('products');

  // ! 
  // revalidatePath('/')
  //* This case would revalidate the entire page
};