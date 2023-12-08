class Product {
  constructor(prisma) {
    this.prisma = prisma;
  }

  async findByID(id) {
    return await this.prisma.product.findUnique({
      where: {
        id: id,
      },
    });
  }
  async updateStockDecre(id) {
    return await this.prisma.product.update({
      where: {
        id: id,
      },
      data: {
        quality: {
          decrement: 1,
        },
      },
    });
  }
}

module.exports = Product;
