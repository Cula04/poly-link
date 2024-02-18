'use client';
import { VendingMachineProduct, VendingMachineProductCategory } from '@/types';
import { useQuery } from '@tanstack/react-query';

import request, { gql } from 'graphql-request';

type ProductChanges = Pick<VendingMachineProduct, 'date' | 'change'>;

export const useProductChangesQuery = (
  productCategory: VendingMachineProductCategory,
): ProductChanges[] | undefined => {
  const url = process.env.NEXT_PUBLIC_GRAPHQL_API_URL;
  if (!url) throw new Error('GRAPHQL_API_URL is not defined');

  const secQuery = gql`
    query VendingMachineProducts(
      $getVendingMachineProductArgs: GetVendingMachineProductArgs!
    ) {
      vendingMachineProducts(
        getVendingMachineProductArgs: $getVendingMachineProductArgs
      ) {
        change
        date
      }
    }
  `;

  const variables = {
    getVendingMachineProductArgs: {
      type: productCategory,
      threshold: 7,
    },
  };

  const { data, error } = useQuery<{
    vendingMachineProducts: ProductChanges[];
  }>({
    queryKey: ['gatProductChanges', variables],
    queryFn: async () => request(url, secQuery, variables),
  });

  if (error) {
    throw new Error(`Error while fetching data from ${url} - ${error}`);
  }

  return data?.vendingMachineProducts;
};
