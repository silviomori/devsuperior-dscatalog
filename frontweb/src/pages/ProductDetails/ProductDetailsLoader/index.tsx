import React from 'react';
import ContentLoader from 'react-content-loader';

const ProductDetailsLoader = () => (
  <ContentLoader viewBox="0 0 320 280" height={280} width={320}>
    <rect x="3" y="3" rx="0" ry="0" width="272" height="20" />
    <rect x="1" y="28" rx="0" ry="0" width="219" height="20" />
    <rect x="1" y="55" rx="0" ry="0" width="254" height="20" />
  </ContentLoader>
);

export default ProductDetailsLoader;
