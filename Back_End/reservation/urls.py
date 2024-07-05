from django.urls import path , include
from . import views  
from rest_framework.routers import DefaultRouter
from django.conf import settings  #Ajout
from django.conf.urls.static import static #Ajout



router=DefaultRouter()
router.register("terrain",views.TerrainView)
router.register("client",views.ClientView)
router.register("reservation",views.ReservationView)



urlpatterns = [
    path('viewset/',include(router.urls)),
    path('viewset/',include(router.urls)),
    path('viewset/',include(router.urls)),

    

   
    

]
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)


