#Objectif: Supprimer la réservation si elle dépasse 30 minutes non payée
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.utils import timezone
from .models import Reservation, Client
import threading
import time

@receiver(post_save, sender=Reservation)
def check_expired_reservations(sender, instance, created, **kwargs):
    if created and not instance.is_paid:
        def delete_reservation():
            threshold_time = instance.created_at + timezone.timedelta(minutes=30)
            while timezone.now() < threshold_time:
                time.sleep(60)  # Vérifier toutes les minutes

            if not instance.is_paid:
                instance.delete()
                # Supprimer le client si aucune autre réservation n'existe
                if not Reservation.objects.filter(client=instance.client).exists():
                    instance.client.delete()

        threading.Thread(target=delete_reservation).start()
