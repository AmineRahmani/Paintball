from django.core.mail import send_mail
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json

@csrf_exempt
def send_email(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        name = data['name']
        email = data['email']
        message = data['message']

        send_mail(
            f'New message from {name}',
            message,
            email,
            ['mouhibchandoul741@gmail.com'],
        )
        return JsonResponse({'message': 'Email sent successfully'})
    return JsonResponse({'error': 'Invalid request'}, status=400)
