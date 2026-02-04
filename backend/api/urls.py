from django.urls import path
from . import views

urlpatterns = [
    path("items/", views.ItemListCreate.as_view(),name="item-list"),
    path("items/delete/<int:pk>/", views.ItemDelete.as_view(), name="delete-item"),
    path("me/", views.MeView.as_view(), name="me"),
    path("me/update/", views.UpdateMeView.as_view(), name="update-me"),
]
