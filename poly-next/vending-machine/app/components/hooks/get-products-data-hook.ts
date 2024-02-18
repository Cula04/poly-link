import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const GetProductsDataHook = () => {
  const { data, error } = useSWR('/api/products', fetcher);

  return {
    products: data,
    isLoading: !error && !data,
    isError: error,
  };
};
