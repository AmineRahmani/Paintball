from django.shortcuts import render,redirect
from rest_framework import viewsets
from .models import Terrain, Client, Reservation
from .serializers import TerrainSerializer, ClientSerializer, ReservationSerializer
from rest_framework.response import Response
from rest_framework import status
from django.conf import settings
from django.core.mail import send_mail
from django.urls import reverse
from django.http import JsonResponse, HttpResponseBadRequest
from django.shortcuts import get_object_or_404
from rest_framework.decorators import action
from django.utils import timezone


class TerrainView(viewsets.ModelViewSet):
    queryset = Terrain.objects.all()
    serializer_class = TerrainSerializer


class ClientView(viewsets.ModelViewSet):
    queryset = Client.objects.all()
    serializer_class = ClientSerializer


class ReservationView(viewsets.ModelViewSet):
    queryset = Reservation.objects.all()
    serializer_class = ReservationSerializer

    def create(self, request, *args, **kwargs):
        data = request.data

        # Créer un nouvel objet Client à partir des données reçues
        client = Client.objects.create(
            name=data.get('name'),
            lastname=data.get('lastname'),
            email=data.get('email'),
            phone=data.get('phone')
        )

        # Récupérer l'instance de Terrain correspondant à l'ID fourni
        terrain_id = data.get('terrainId')
        try:
            terrain = Terrain.objects.get(pk=terrain_id)
        except Terrain.DoesNotExist:
            return Response({'message': 'Terrain not found'}, status=status.HTTP_404_NOT_FOUND)

        # Calculer le montant total à payer
        total_amount = float(data.get('numberOfPlayers')) * float(data.get('numberOfBalls'))
        # Calculer le montant à payer en ligne (10%)
        online_payment_amount = total_amount * 0.1
        # Calculer le montant à payer sur place
        onsite_payment_amount = total_amount - online_payment_amount

        # Créer une instance de Reservation à partir des données reçues
        reservation = Reservation.objects.create(
            client=client,
            terrain=terrain,
            date=data.get('reservationDate'),
            start_time=data.get('startTime'),
            end_time=data.get('endTime'),
            numberOfPlayers=data.get('numberOfPlayers'),
            balls_per_player=data.get('numberOfBalls')
        )

        # Utiliser le sérialiseur pour transformer l'objet Reservation en JSON
        serializer = ReservationSerializer(reservation)

        # Générer l'URL de paiement
        payment_url = f'http://localhost:3000/payment?reservation_id={reservation.id}&client_id={client.id}'

        # Générer l'URL d'annulation
        cancellation_url = request.build_absolute_uri(
            reverse('reservation-cancel', kwargs={'pk': reservation.id})
        )

        # Envoyer un email de confirmation avec les détails de la réservation
        subject = 'Confirmation de votre réservation'
        message = (
            f'Bonjour {client.name} {client.lastname},\n\n'
            f'Votre réservation pour le terrain {terrain.name} le {reservation.date} '
            f'de {reservation.start_time} à {reservation.end_time} a été confirmée.\n\n'
            f'Nombre de joueurs : {reservation.numberOfPlayers}\n'
            f'Nombre de boules par joueur : {reservation.balls_per_player}\n'
            f'Montant total à payer: {total_amount} dinars\n'
            f'Montant à payer en ligne (10%) : {online_payment_amount} dinars\n'
            f'Montant à payer sur place : {onsite_payment_amount} dinars\n\n'
            f'Merci de votre confiance.\n\n'
            f'Pour procéder au paiement, veuillez suivre ce lien : {payment_url}\n\n'
            f'Si vous souhaitez annuler votre réservation, veuillez suivre ce lien : {cancellation_url}\n\n'
            f'Votre équipe.'
        )

        send_mail(
            subject,
            message,
            settings.DEFAULT_FROM_EMAIL,
            [client.email],
            fail_silently=False,
        )

        return Response({
            'reservation_id': reservation.id,
            'client_id': client.id,
            'reservation': serializer.data
        }, status=status.HTTP_201_CREATED)

    @action(detail=True, methods=['get'], url_path='cancel', url_name='cancel')
    def cancel_reservation(self, request, pk=None):
        reservation = get_object_or_404(Reservation, pk=pk)
        client = reservation.client

        # Supprimer la réservation
        reservation.delete()

        # Vérifier si le client a d'autres réservations
        if not Reservation.objects.filter(client=client).exists():
            client.delete()

        return JsonResponse({'message': 'Réservation annulée avec succès.'})

    @action(detail=True, methods=['get'], url_path='payment', url_name='payment')
    def payment(self, request, pk=None):
        reservation = get_object_or_404(Reservation, pk=pk)
        if reservation:
            return redirect('http://localhost:3000/payment?reservation_id={}&client_id={}'.format(reservation.id, reservation.client.id))
        else:
            return HttpResponseBadRequest("La réservation n'existe pas.")


  