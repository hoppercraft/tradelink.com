from django.shortcuts import render
from django.contrib.auth import get_user_model
from rest_framework.parsers import MultiPartParser, FormParser
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
        queryset = Item.objects.all()
        mine = self.request.query_params.get("mine")

        if mine == "true":
            queryset = queryset.filter(owner=self.request.user)

        return queryset

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class ItemUpdate(generics.UpdateAPIView):
    serializer_class = ItemSerializer
    permission_classes = [IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]

    def get_queryset(self):
        return Item.objects.filter(owner=self.request.user)
    
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
        serializer = UserSerializer(request.user, context={'request': request})
        return Response(serializer.data)
    

class UpdateMeView(generics.UpdateAPIView):
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]
    def get_object(self):
        return self.request.user
    
    