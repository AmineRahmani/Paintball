from django.shortcuts import render
from rest_framework import generics
from rest_framework.response import Response
from rest_framework import status
from .models import Review
from .serializers import ReviewSerializer


class ReviewListCreateAPIView(generics.ListCreateAPIView):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer

    def create(self, request, *args, **kwargs):
        # Récupérer les données du formulaire POST
        data = request.data


        # Créer une instance de Review à partir des données reçues et associez-la au client créé ou existant
        review = Review.objects.create(
            user=data.get("name"),
            rating=data.get("rating"), 
            comment=data.get("comment"),
        )

        # Utiliser le sérialiseur pour transformer l'objet Review en JSON
        serializer = ReviewSerializer(review)

        # Retourner une réponse HTTP appropriée
        return Response(serializer.data, status=status.HTTP_201_CREATED)

