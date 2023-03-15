import sanityClient from '@sanity/client';

export const client = sanityClient({
  projectId: 'eoa5gkj1',
  dataset: 'production',
  apiVersion: '2023-03-14',
  useCdn: false,
  token: process.env.NEXT_PUBLIC_SANITY_TOKEN,
});
