export interface PaymentMethod {
  id: string;
  name: string;
  type: 'mobile-money' | 'cash-on-delivery';
  description: string;
  isAvailable: boolean;
}

export interface PaymentRequest {
  orderId: string;
  amount: number;
  currency: string;
  paymentMethod: string;
  customerInfo: {
    name: string;
    email: string;
    phone: string;
    address: string;
  };
}

export interface PaymentResponse {
  success: boolean;
  transactionId?: string;
  message: string;
  status: 'pending' | 'completed' | 'failed';
}

export const paymentService = {
  async getPaymentMethods(): Promise<PaymentMethod[]> {
    return [
      {
        id: 'mobile-money',
        name: 'Mobile Money',
        type: 'mobile-money',
        description: 'Paiement via Airtel Money, Orange Money, MVola',
        isAvailable: true
      },
      {
        id: 'cash-on-delivery',
        name: 'Paiement à la livraison',
        type: 'cash-on-delivery',
        description: 'Payez en espèces lors de la réception',
        isAvailable: true
      }
    ];
  },

  async processPayment(paymentRequest: PaymentRequest): Promise<PaymentResponse> {
    // Simulation d'un traitement de paiement
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    if (paymentRequest.paymentMethod === 'mobile-money') {
      return {
        success: true,
        transactionId: `TXN-${Date.now()}`,
        message: 'Paiement mobile money initié avec succès',
        status: 'pending'
      };
    }
    
    if (paymentRequest.paymentMethod === 'cash-on-delivery') {
      return {
        success: true,
        transactionId: `COD-${Date.now()}`,
        message: 'Commande confirmée - Paiement à la livraison',
        status: 'pending'
      };
    }
    
    return {
      success: false,
      message: 'Méthode de paiement non supportée',
      status: 'failed'
    };
  }
};