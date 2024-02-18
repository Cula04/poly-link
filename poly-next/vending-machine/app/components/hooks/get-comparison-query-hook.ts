'use client';
import { VendingMachineProduct, VendingMachineProductCategory } from '@/types';
import { useQuery } from '@tanstack/react-query';

import request, { gql } from 'graphql-request';

export const useComparisonQuery = (
  productType: VendingMachineProductCategory,
): VendingMachineProduct[] | undefined => {
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
        currentAIAmount
        currentAmount
        threshold
        type
      }
    }
  `;

  const variables = {
    getVendingMachineProductArgs: {
      type: productType,
    },
  };

  const { data, error } = useQuery<{
    vendingMachineProducts: VendingMachineProduct[];
  }>({
    queryKey: ['useComparisonQuery', productType],
    queryFn: async () => request(url, secQuery, variables),
  });

  if (error) {
    throw new Error(`Error while fetching data from ${url} - ${error}`);
  }

  return data?.vendingMachineProducts;
};
