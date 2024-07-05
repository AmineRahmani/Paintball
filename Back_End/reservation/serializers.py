from rest_framework import serializers
from .models import *


class ImageTerrainSerializer(serializers.ModelSerializer):
    class Meta:
        model = ImageTerrain
        fields = ['id','image']  

class TerrainSerializer(serializers.ModelSerializer):
    images = ImageTerrainSerializer(many=True,read_only=True)

    class Meta:
        model=Terrain
        fields='__all__'

    def get_images(self, obj):
        return [image.image.url for image in obj.images.all()]

class ClientSerializer(serializers.ModelSerializer):
    class Meta:
        model=Client
        fields='__all__'

class ReservationSerializer(serializers.ModelSerializer):
    class Meta:
        model=Reservation
        fields='__all__'

     