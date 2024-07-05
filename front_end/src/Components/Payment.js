import React, { useCallback } from 'react'; //memorisation des informations
import { useStripe, CardElement } from '@stripe/react-stripe-js';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const Payment = () => {
  const stripe = useStripe();
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const reservationId = searchParams.get('reservation_id');
  const clientId = searchParams.get('client_id');

  const handlePayment = useCallback(async () => {
    if (!stripe || !reservationId || !clientId) {
      return;
    }

    try {
      const response = await axios.post('http://localhost:8000/create-checkout-session/', {
        reservation_id: reservationId,
        client_id: clientId,
      });

      const { id } = response.data;
      const result = await stripe.redirectToCheckout({ sessionId: id });

      if (result.error) {
        console.error(result.error.message);
      }
    } catch (error) {
      console.error('Erreur lors de la création de la session de paiement :', error);
    }
  }, [reservationId, clientId, stripe]);

  return (
    <div>
      <h2>Paiement</h2>
      <form>
        <CardElement />
        <button  type="button" onClick={handlePayment}>
          Payer
        </button>
      </form>
    </div>
  );
};

export default Payment;
