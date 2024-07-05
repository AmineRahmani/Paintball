# urls.py
from django.urls import path
from .views import StripeCheckoutView, payment_success, payment_failure

urlpatterns = [
    path('create-checkout-session/', StripeCheckoutView.as_view(), name='create-checkout-session'),
    path('success', payment_success, name='payment-success'),
    path('cancel', payment_failure, name='payment-failure'),
]
