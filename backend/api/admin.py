from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User, Item, Conversation, Message,Report

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
    
@admin.register(Report)
class ReportAdmin(admin.ModelAdmin):
    # Columns to show in the list view
    list_display = ('id', 'reporter', 'short_description', 'created_at')
    
    # Add a sidebar to filter by date
    list_filter = ('created_at',)
    
    # Allow searching by the username or the text of the report
    search_fields = ('reporter__username', 'description')
    
    # Make the date read-only so it can't be tampered with
    readonly_fields = ('created_at',)

    # Helper function to shorten long descriptions in the list view
    def short_description(self, obj):
        return obj.description[:75] + "..." if len(obj.description) > 75 else obj.description
    
    short_description.short_description = "Description Preview"