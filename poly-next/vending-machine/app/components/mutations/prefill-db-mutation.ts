import request, { gql } from 'graphql-request';

export const prefillDatabaseMutation = async () => {
  const url = process.env.NEXT_PUBLIC_GRAPHQL_API_URL;
  if (!url) throw new Error('GRAPHQL_API_URL is not defined');

  // Define the GraphQL mutation
  const mutation = gql`
    mutation PrefillDBWithNoAIData($prefillData: PrefillDBWithNoAIDataInput!) {
      prefillDBWithNoAIData(prefillData: $prefillData)
    }
  `;

  // Define the variables for the mutation
  const variables = {
    prefillData: {
      date: '2023-01-01',
    },
  };

  const result = await request<{ prefillDBWithNoAIData: boolean }>(
    url,
    mutation,
    variables,
  );

  if (!result || !result['prefillDBWithNoAIData']) {
    throw new Error('Failed to prefill database');
  }
};
