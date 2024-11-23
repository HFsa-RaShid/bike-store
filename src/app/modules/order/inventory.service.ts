import { Bike } from '../bike.model';

const updateInventory = async (productId: string, orderedQuantity: number) => {
  const product = await Bike.findById(productId);
  if (!product) {
    throw new Error('Product not found');
  }

  // sufficient stock
  if (product.quantity < orderedQuantity) {
    throw new Error('Insufficient stock available');
  }

  product.quantity -= orderedQuantity;
  if (product.quantity === 0) {
    product.inStock = false;
  }

  await product.save();
};

export const InventoryService = {
  updateInventory,
};
