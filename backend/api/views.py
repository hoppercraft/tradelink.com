from django.shortcuts import render
from django.contrib.auth import get_user_model

User = get_user_model()

from rest_framework import generics
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import UserSerializer,ItemSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import Item

class ItemListCreate(generics.ListCreateAPIView):
    serializer_class = ItemSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Item.objects.all()

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

class ItemDelete(generics.DestroyAPIView):
    serializer_class=ItemSerializer
    permission_classes=[IsAuthenticated]
    def get_queryset(self):
        user = self.request.user
        return Item.objects.filter(owner=user)
        

class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]



class MeView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        serializer = UserSerializer(request.user)
        return Response(serializer.data)