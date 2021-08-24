import Head from 'next/head';
import React from 'react';
import products from '../../products.json';

import fromImageToUrl from '../../utils/urls';
import twoDecimals from '../../utils/format';

const product = products[0];

const Product = () => (
  <div>
    <Head>
      {product.meta_title
        && <title>{product.meta_title}</title>}
      {
        product.meta_description
        && <meta name="description">{product.meta_description}</meta>
      }
    </Head>
    <h3>{product.name}</h3>
    <img src={fromImageToUrl(product.image)} />
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

export default Product;
