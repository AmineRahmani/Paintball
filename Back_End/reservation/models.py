from django.db import models
from django.views.generic import CreateView


class Terrain(models.Model):
    name = models.CharField(max_length=100)
    capacity = models.IntegerField()
    description = models.TextField()
    
    def __str__(self):
        return self.name

class ImageTerrain(models.Model):
    terrain = models.ForeignKey(Terrain, on_delete=models.CASCADE, related_name='images')
    image = models.ImageField(upload_to='terrain_images')

    def __str__(self):
        return f"Image {self.pk} for {self.terrain.name}"

class Client(models.Model):
    name = models.CharField(max_length=100)
    lastname = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    phone = models.IntegerField()

    def __str__(self):
        return self.name

class Reservation(models.Model):
    client = models.ForeignKey(Client, on_delete=models.CASCADE)
    terrain = models.ForeignKey(Terrain, on_delete=models.CASCADE, related_name='reservations')
    date = models.DateField()
    start_time = models.TimeField()
    end_time = models.TimeField()
    numberOfPlayers = models.IntegerField()
    balls_per_player = models.IntegerField()
    is_paid = models.BooleanField(default=False)  # Champ pour indiquer si la réservation est payée ou non
    created_at = models.DateTimeField(auto_now_add=True)

    def is_expired(self):
        difference = timezone.now() - self.created_at
        return difference.total_seconds() > 30 * 60 and not self.is_paid

    def __str__(self):
        return f"Reservation for {self.client.name} {self.client.lastname} on {self.date} - {self.start_time} to {self.end_time} at {self.terrain.name}"
