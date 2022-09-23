from django.contrib.auth.models import User
from rest_framework.serializers import ModelSerializer
from django.contrib.auth.password_validation import validate_password
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from .models import Blog, Profile
from rest_framework.fields import CurrentUserDefault

class ProfileSerializer(ModelSerializer):
    user = serializers.CharField(source='user.username', read_only=True)
    class Meta:
        model = Profile
        fields = '__all__'



class BlogSerializer(ModelSerializer):
    user = serializers.CharField(source='user.username', read_only=True)
    
    class Meta:
        model = Blog
        fields = '__all__'
        read_only_fields = ['user']
        user = serializers.HiddenField(
    default=serializers.CurrentUserDefault()
)

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        # Add custom claims
        token['username'] = user.username
        token['email'] = user.email
        # ...
        return token

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(
        write_only=True, required=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = User
        fields = ('username', 'password', 'password2')

    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError(
                {"password": "Password fields didn't match."})

        return attrs

    def create(self, validated_data):
        user = User.objects.create(
            username=validated_data['username']
        )

        user.set_password(validated_data['password'])
        user.save()

        return user

class getUser(ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'