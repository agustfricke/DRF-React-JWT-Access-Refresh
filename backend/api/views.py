from django.shortcuts import render
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.http import JsonResponse
from api.serializer import MyTokenObtainPairSerializer, RegisterSerializer, BlogSerializer, ProfileSerializer, getUser
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import generics
from django.contrib.auth.models import User
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from .models import Blog, Profile
from rest_framework.fields import CurrentUserDefault



@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getSoloPro(request):
    profile = Profile.objects.all()
    serializer = ProfileSerializer(profile, many=True)
    return Response(serializer.data)


@api_view(['POST'])
def createProfile(request):
    data = request.data
    profile = Profile.objects.create(
        name = data['name'],
        last_name = data['last_name'],
        bio = data['bio'],

        user = request.user
    )
    serializer = ProfileSerializer(profile, many=False)
    return Response(serializer.data) 

@api_view(['PUT'])
def updateProfile(request, pk):
    data = request.data
    profile = Profile.objects.get(id=pk)
    serializer = ProfileSerializer(instance=profile, data=data)
    if profile.user.id == request.user.id:
        if serializer.is_valid():
            serializer.save()
    else:
        return Response({'Error': 'Unauthorized'}, status=status.HTTP_401_UNAUTHORIZED)
    return Response(serializer.data)

@api_view(['GET'])
def getPerfilPersonalizado(request, pk):
    profile = Profile.objects.get(id=pk)

    serializer = ProfileSerializer(profile, many=False)
    return Response(serializer.data)



@api_view(['GET'])
def getProfileSolo(request, pk):
    profile = User.objects.get(id=pk)
    blogs = profile.blog_set.all()

    serializer = getUser(profile, many=False)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getprofile(request):
    blog = User.objects.all()
    serializer = getUser(blog, many=True)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def userBlogs(request):
    user = request.user
    blogs = user.blog_set.all()
    serializer = BlogSerializer(blogs, many=True)
    return Response(serializer.data)



class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = RegisterSerializer


@api_view(['GET'])
def getRoutes(request):
    routes = [
        '/api/token/',
        '/api/register/',
        '/api/token/refresh/',
        '/api/prediction/'
    ]
    return Response(routes)


@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def testEndPoint(request):
    if request.method == 'GET':
        data = f"Congratulation {request.user}, your API just responded to GET request"
        return Response({'response': data}, status=status.HTTP_200_OK)
    elif request.method == 'POST':
        text = request.POST.get('text')
        data = f'Congratulation your API just responded to POST request with text: {text}'
        return Response({'response': data}, status=status.HTTP_200_OK)
    return Response({}, status.HTTP_400_BAD_REQUEST)



    # Post Blog CRUD
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getBlog(request):
    blog = Blog.objects.all()
    serializer = BlogSerializer(blog, many=True)
    return Response(serializer.data)


@api_view(['POST'])
def createBlog(request):
    data = request.data
    blog = Blog.objects.create(
        body = data['body'],
        user = request.user
    )
    serializer = BlogSerializer(blog, many=False)
    return Response(serializer.data) 




@api_view(['PUT'])
def updateBlog(request, pk):
    data = request.data
    blog = Blog.objects.get(id=pk)
    serializer = BlogSerializer(instance=blog, data=data)
    if blog.user.id == request.user.id:
        if serializer.is_valid():
            serializer.save()
    else:
        return Response({'Error': 'Unauthorized'}, status=status.HTTP_401_UNAUTHORIZED)
    return Response(serializer.data)


@api_view(['DELETE'])
def deleteBlog(request, pk):
    blog = Blog.objects.get(id=pk)
    if blog.user == request.user:
        blog.delete()
    else:
        return Response({'Error': 'Unauthorized'}, status=status.HTTP_401_UNAUTHORIZED)
    return Response('Blog Eliminado')
