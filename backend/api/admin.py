from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User, Item

# Use the built-in UserAdmin so you can still manage 
# passwords and permissions easily
admin.site.register(User, UserAdmin)
admin.site.register(Item)