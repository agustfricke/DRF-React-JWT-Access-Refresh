from django.contrib.auth.hashers import make_password
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.permissions import IsAuthenticated

from . serializers import MyTokenObtainPairSerializer, UserSerializer, MyUserSerializer
from . models import User

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def users(request):
    users = User.objects.all()
    serializer = UserSerializer(users, many=True)
    return Response(serializer.data)

@api_view(['POST'])
def register(request):
    data = request.data
    user = User.objects.create(
        username=data['username'],
        email=data['email'],
        password=make_password(data['password'])
        )
    serializer = MyUserSerializer(user, many=False)
    return Response(serializer.data)

class MyTokenObtainPairSerializer(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

