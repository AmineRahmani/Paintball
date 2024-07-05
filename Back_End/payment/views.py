import stripe
from django.conf import settings
from django.http import JsonResponse, HttpResponse
from django.shortcuts import redirect, get_object_or_404
from rest_framework.views import APIView
from reservation.models import Reservation
from .models import UserPayment
from django.core.mail import send_mail

stripe.api_key = settings.STRIPE_SECRET_KEY

class StripeCheckoutView(APIView):
    def post(self, request, *args, **kwargs):
        reservation_id = request.data.get('reservation_id')
        client_id = request.data.get('client_id')
        if not reservation_id or not client_id:
            return JsonResponse({'error': 'Reservation ID and Client ID are required'}, status=400)

        reservation = get_object_or_404(Reservation, id=reservation_id)
        YOUR_DOMAIN = settings.SITE_URL

        try:
            online_payment_amount, remaining_amount = self.calculate_reservation_cost(reservation)

            checkout_session = stripe.checkout.Session.create(
                customer_email=reservation.client.email,
                line_items=[
                    {
                        'price_data': {
                            'currency': 'usd',
                            'product_data': {
                                'name': f'Reservation for {reservation.terrain.name}',
                                'description': f'Date: {reservation.date}, Time: {reservation.start_time} - {reservation.end_time}, Players: {reservation.numberOfPlayers}',
                            },
                            'unit_amount': int(online_payment_amount * 100),
                        },
                        'quantity': 1,
                    },
                ],
                payment_method_types=['card'],
                mode='payment',
                success_url=f"{YOUR_DOMAIN}/success?reservation_id={reservation_id}&session_id={{CHECKOUT_SESSION_ID}}",
                cancel_url=f"{YOUR_DOMAIN}/cancel?reservation_id={reservation_id}"
            )
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)

        return JsonResponse({'id': checkout_session.id})

    def calculate_reservation_cost(self, reservation):
        total_cost = reservation.balls_per_player * reservation.numberOfPlayers
        online_payment_amount = total_cost * 0.1
        remaining_amount = total_cost - online_payment_amount
        return online_payment_amount, remaining_amount

def payment_success(request):
    session_id = request.GET.get('session_id')
    reservation_id = request.GET.get('reservation_id')

    if not session_id or not reservation_id:
        return HttpResponse('Missing session ID or reservation ID', status=400)

    session = stripe.checkout.Session.retrieve(session_id)
    if session.payment_status == 'paid':
        user_payment = get_object_or_404(UserPayment, reservation_id=reservation_id)
        user_payment.payment_bool = True
        user_payment.save()

        # Mettre à jour le statut de la réservation
        reservation = get_object_or_404(Reservation, id=reservation_id)
        reservation.is_paid = True
        reservation.save()

        # Envoyer un e-mail de confirmation aux utilisateurs
        subject = 'Confirmation de réservation'
        message = 'Votre réservation a été payée avec succès.'
        from_email = settings.DEFAULT_FROM_EMAIL,  # Adresse e-mail de l'expéditeur
        to_email = [reservation.client.email]  # Liste des adresses e-mail des destinataires
        send_mail(subject, message, from_email, to_email)

        return HttpResponse('Payment successful')
    else:
        return HttpResponse('Payment not completed', status=400)

def payment_failure(request):
    return HttpResponse('Payment failed')
