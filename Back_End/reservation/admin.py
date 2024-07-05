from django.contrib import admin
from .models import *

# Register your models here.

class ImageTerrainInline(admin.TabularInline):
    model = ImageTerrain
    extra = 2   

class TerrainAdmin(admin.ModelAdmin):
    inlines = [ImageTerrainInline,]
 
# Register your models here.
admin.site.register(Terrain,TerrainAdmin)
admin.site.register(Client)
admin.site.register(Reservation)
admin.site.register(ImageTerrain)