import { Injectable } from '@nestjs/common';

import { PrismaService } from '../database/prisma/prisma.service';
import { KafkaService } from '../messaging/kafka.service';

interface CreatePurchaseParams {
  customerId: string;
  productId: string;
}

@Injectable()
export class PurchasesService {
  constructor(private prisma: PrismaService, private kafka: KafkaService) {}

  async listAllPurchases() {
    return await this.prisma.purchase.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async listAllPurchasesFromCustomer(customerId: string) {
    return await this.prisma.purchase.findMany({
      where: { customerId },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async createPurchase({ customerId, productId }: CreatePurchaseParams) {
    const product = await this.prisma.product.findUnique({
      where: { id: productId },
    });

    if (!product) {
      throw new Error('Product not found.');
    }

    const purchase = await this.prisma.purchase.create({
      data: {
        customerId,
        productId,
      },
    });

    const customer = await this.prisma.customer.findUnique({
      where: { id: customerId },
    });

    // vou emitir uma mensagem
    // no primeiro parâmetro eu falo que qual tópico eu quero emitir a mensagem
    this.kafka.emit('purchases.new-purchase', {
      customer: {
        authUserId: customer.authUserId,
      },
      product: {
        id: product.id,
        title: product.id,
        slug: product.slug,
      },
    });

    return purchase;
  }
}
