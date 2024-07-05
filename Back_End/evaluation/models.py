from django.db import models

# Create your models here.
class Review(models.Model):
    user = models.CharField(max_length=40)
    rating = models.IntegerField(choices=[(i,i) for i in range(1,6)])  # Note attribuée par l'utilisateur (peut être une échelle de 1 à 5)
    comment = models.TextField(max_length=250)  
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.user

  
