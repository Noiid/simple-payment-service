class Transaction {
  constructor(prisma) {
    this.prisma = prisma;
  }

  async create({ billCode, userId, productId, total, snapUrl, token }) {
    return await this.prisma.transaction.create({
      data: {
        userId,
        productId,
        total,
        snapUrl,
        token,
        billCode,
      },
    });
  }

  async checkTransactionPerDay(order_id) {
    const twentyFourHoursAgo = new Date();
    twentyFourHoursAgo.setHours(twentyFourHoursAgo.getHours() - 24); //checking last 24 hours transaction with assumsion each transaction have a expire 24 hour from time post transaction
    let filter = {
      createdAt: {
        gte: twentyFourHoursAgo,
      },
      status: {
        not: {
          equals: "settlement",
        },
      },
    };
    //check if specific order_id
    if (typeof order_id !== "undefined") {
      filter = {
        createdAt: {
          gte: twentyFourHoursAgo,
        },
        status: {
          not: {
            equals: "settlement",
          },
        },
        billCode: order_id,
      };
    }
    return await this.prisma.transaction.findMany({
      where: filter,
    });
  }

  async updateStatusTransaction(id, status) {
    return await this.prisma.transaction.update({
      where: {
        id: id,
      },
      data: {
        status: status,
      },
    });
  }
}

module.exports = Transaction;
