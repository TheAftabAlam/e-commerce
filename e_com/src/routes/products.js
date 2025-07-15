import content from '../data/content.json'

const loadProductById = ({ params }) => {
  const id = Number(params.productId);
  const product = content?.products?.find((product) => product.id === id)
  return {product};
}

export default loadProductById
