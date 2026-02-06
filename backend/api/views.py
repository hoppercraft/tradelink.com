from rest_framework.decorators import api_view
from django.contrib.auth import get_user_model
from rest_framework.parsers import MultiPartParser, FormParser
User = get_user_model()
from rest_framework import generics,permissions,status
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import UserSerializer,ItemSerializer,ConversationSerializer, MessageSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import Item,Message,Conversation

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
    
    
class ConversationList(generics.ListAPIView):
    serializer_class = ConversationSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Conversation.objects.filter(participants=self.request.user).order_by("-updated_at")

class MessageListCreate(generics.ListCreateAPIView):
    serializer_class = MessageSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        conv_id = self.kwargs['conversation_id']
        return Message.objects.filter(conversation_id=conv_id)

    def perform_create(self, serializer):
        conv_id = self.kwargs.get('conversation_id')
        serializer.save(sender=self.request.user, conversation_id=conv_id)

class StartConversationView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        owner_id = request.data.get("owner_id")

        if not owner_id:
            return Response({"error": "Owner ID required"}, status=400)

        try:
            owner_id = int(owner_id)
        except ValueError:
            return Response({"error": "Invalid owner ID"}, status=400)

        if owner_id == request.user.id:
            return Response(
                {"error": "You cannot start a conversation with yourself"},
                status=400
            )

        try:
            other_user = User.objects.get(id=owner_id)
        except User.DoesNotExist:
            return Response({"error": "User not found"}, status=404)

        conversation = (
            Conversation.objects
            .filter(participants=request.user)
            .filter(participants=other_user)
            .distinct()
            .first()
        )

        if not conversation:
            conversation = Conversation.objects.create()
            conversation.participants.set([request.user, other_user])

        return Response({"conversation_id": conversation.id}, status=200)

@api_view(['POST'])
def mark_as_read(request, conversation_id):
    # We target messages in this chat, that I DID NOT send, that are currently False
    updated_count = Message.objects.filter(
        conversation_id=conversation_id, 
        is_read=False
    ).exclude(sender=request.user).update(is_read=True)
    
    print(f"Messages updated: {updated_count}") # Check your terminal for this!
    return Response({"status": "success", "updated": updated_count})