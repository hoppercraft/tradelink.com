from django.db import models
from django.contrib.auth.models import AbstractUser
# Create your models here.
class User(AbstractUser):
    email = models.EmailField(unique=True)
    phone = models.CharField(max_length=15, unique=True, null=True, blank=True)
    avatar = models.ImageField(upload_to="user_avatar/", null=True, blank=True)

class Item(models.Model):
    item_name = models.CharField(max_length=100)
    image = models.ImageField(upload_to="item_images/", null=True, blank=True)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    created_at = models.DateTimeField(auto_now_add=True)
    owner = models.ForeignKey(User, on_delete=models.CASCADE,related_name="items")

    def __str__(self):
       return self.item_name

class Conversation(models.Model):
    participants = models.ManyToManyField(User, related_name='conversations')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Chat between: {', '.join([u.username for u in self.participants.all()])}"

class Message(models.Model):
    conversation = models.ForeignKey(Conversation, on_delete=models.CASCADE, related_name='messages')
    sender = models.ForeignKey(User, on_delete=models.CASCADE, related_name='sent_messages')
    text = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)
    is_read = models.BooleanField(default=False)
    class Meta:
        ordering = ['timestamp']