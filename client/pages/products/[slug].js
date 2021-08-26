import Head from 'next/head';
import React from 'react';

import { fromImageToUrl, API_URL } from '../../utils/urls';
import { twoDecimals } from '../../utils/format';

const Product = ({ product }) => (
  <div>
    <Head>
      {product.meta_title
        && <title>{product.meta_title}</title>}
      {
        product.meta_description
        && (
        <meta
          name="description"
          content={product.meta_description}
        />
        )
      }
    </Head>
    <h3>{product.name}</h3>
    <img
      src={fromImageToUrl(product.image)}
      alt=""
    />
    <h3>{product.name}</h3>
    <p>
      $
      {twoDecimals(product.price)}
    </p>
    <p>
      {product.content}
    </p>
  </div>
);

export async function getStaticProps({ params: { slug } }) {
  const product_res = await fetch(`${API_URL}/products/?slug=${slug}`);
  const found = await product_res.json();

  return {
    props: {
      product: found[0], // Because the API response for filters is an array
    },
  };
}

export async function getStaticPaths() {
  // Retreive all possible paths
  const products_res = await fetch(`${API_URL}/products/`);
  const products = await products_res.json();

  // Return to NextJS context
  return {
    paths: products.map((product) => ({
      params: { slug: String(product.slug) },
    })),
    fallback: false, // Tells NextJS to show 404 if param is not matched
  };
}

export default Product;
