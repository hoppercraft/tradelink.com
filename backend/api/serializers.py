from rest_framework import serializers
from .models import Item,Conversation,Message,Report
from django.contrib.auth import get_user_model

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id","username", "email", "phone", "password","avatar"]
        extra_kwargs = {"password": {"write_only": True},
                        }

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user
    
    def update(self, instance, validated_data):
        password = validated_data.pop('password', None)
        if password:
            instance.set_password(password)
        
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
            
        instance.save()
        return instance

    
class ItemSerializer(serializers.ModelSerializer):
    owner = UserSerializer(read_only=True)

    class Meta:
        model = Item
        fields = ["id", "item_name", "description", "price", "image", "created_at", "owner"]

class MessageSerializer(serializers.ModelSerializer):
    sender_username = serializers.ReadOnlyField(source='sender.username')
    is_me = serializers.SerializerMethodField()

    class Meta:
        model = Message
        fields = ['id', 'text', 'timestamp', 'sender_username', 'is_me']
    def get_is_me(self, obj):
        # Checks if the person who sent the message is the person currently logged in
        return obj.sender == self.context['request'].user

class ConversationSerializer(serializers.ModelSerializer):
    other_person = serializers.SerializerMethodField()
    last_message = serializers.SerializerMethodField()
    unread_messages = serializers.SerializerMethodField()
    class Meta:
        model = Conversation
        fields = ['id', 'other_person', 'last_message', 'updated_at','unread_messages']

    def get_other_person(self, obj):
        user = self.context['request'].user
        other = obj.participants.exclude(id=user.id).first()
        return {
            "name": other.username,
            "avatar": other.avatar.url if hasattr(other, 'avatar') and other.avatar else None
        }

    def get_last_message(self, obj):
        last = obj.messages.last()
        return last.text if last else ""
    
    def get_unread_messages(self, obj):
        user = self.context['request'].user
        return obj.messages.filter(is_read=False).exclude(sender=user).count()
    
class ReportSerializer(serializers.ModelSerializer):
    class Meta:
        model = Report
        fields = ['id', 'description', 'created_at']