from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User, Item, Conversation, Message

class CustomUserAdmin(UserAdmin):
    fieldsets = UserAdmin.fieldsets + (
        ('Extra Info', {'fields': ('phone', 'avatar')}),
    )
    add_fieldsets = UserAdmin.add_fieldsets + (
        ('Extra Info', {'fields': ('phone', 'avatar')}),
    )
    list_display = ['username', 'email', 'phone', 'is_staff']

admin.site.register(User, CustomUserAdmin)

@admin.register(Item)
class ItemAdmin(admin.ModelAdmin):
    list_display = ['item_name', 'price', 'owner', 'created_at']
    search_fields = ['item_name', 'owner__username']

@admin.register(Conversation)
class ConversationAdmin(admin.ModelAdmin):
    list_display = ['id', 'display_participants', 'updated_at']
    
    def display_participants(self, obj):
        return ", ".join([u.username for u in obj.participants.all()])
    display_participants.short_description = 'Participants'

@admin.register(Message)
class MessageAdmin(admin.ModelAdmin):
    list_display = ['sender', 'conversation', 'timestamp', 'text_preview']
    
    def text_preview(self, obj):
        return obj.text[:30] + "..." if len(obj.text) > 30 else obj.text