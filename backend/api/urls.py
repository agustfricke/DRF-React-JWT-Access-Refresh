from django.urls import path
from . import views

from rest_framework_simplejwt.views import (
    TokenRefreshView,
)

urlpatterns = [
    path('getProfile/', views.getSoloPro),

    path('getProfile/<int:pk>/', views.getPerfilPersonalizado),
    path('createProfile/', views.createProfile),
    path('updateProfile/<int:pk>/', views.updateProfile),
    path('profile/<int:pk>/', views.getProfileSolo),
    path('profile/', views.getprofile),
    path('userBlogs/', views.userBlogs),

    path('getBlog/', views.getBlog),
    path('createBlog/', views.createBlog),
    path('updateBlog/<int:pk>/', views.updateBlog),
    path('deleteBlog/<int:pk>/', views.deleteBlog),
    
    path('token/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('register/', views.RegisterView.as_view(), name='auth_register'),

    path('test/', views.testEndPoint, name='test'),

    path('', views.getRoutes)
]