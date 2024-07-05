from rest_framework import serializers
from .models import UserPayment

class UserPaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model=UserPayment
        fields='__all__'
