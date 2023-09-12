'use client';

import { useTransition } from 'react';
import { addProductToDatabase } from '../actions/serverActions';

const AddProductButton = () => {
  const [isPending, startTransition] = useTransition();

  const formData = new FormData();
  formData.append('product', 'Macbook Pro');
  formData.append('price', '1299.99');

  return (
    <button
      className='fixed bottom-10 right-10 border bg-green-500 text-white p-2 rounded-md w-48'
      onClick={() => startTransition(() => addProductToDatabase(formData))}
    >
      {isPending ? 'Adding...' : 'Add Product'}
    </button>
  );
};

export default AddProductButton;
