import { revalidateTag } from 'next/cache';
import { Product } from '../../typings';
import { addProductToDatabase } from '../../actions/serverActions';
import AddProductButton from '../../components/AddProductButton';

export default async function Home() {
  const res = await fetch(
    'https://64f97ee04098a7f2fc14801a.mockapi.io/products',
    {
      cache: 'no-cache',
      next: {
        // revalidate page key
        tags: ['products'],
      },
    }
  );

  const products: Product[] = await res.json();

  return (
    <main className=''>
      <h1 className='text-3xl font-bold text-center'>Products Warehaouse</h1>

      <AddProductButton />

      <form
        action={addProductToDatabase}
        className='flex flex-col gap-5 max-w-xl mx-auto p-5'
      >
        <input
          name='product'
          placeholder='Enter Product name...'
          className='border border-gray-300 rounded-md p-3'
        />
        <input
          name='price'
          placeholder='Enter Price name...'
          className='border border-gray-300 p-3 rounded-md'
        />

        {/* <input type='image' formAction={submitImage} /> */}

        <button className='border bg-blue-500 text-white p-2 rounded-md'>
          Add Product
        </button>
      </form>

      <h2 className='font-bold p-5'>List of Products</h2>

      <div className='flex flex-wrap gap-5'>
        {products.map((product) => (
          <div key={product.id} className='p-5 shadow'>
            <p>{product.product}</p>
            <p>${product.price}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
