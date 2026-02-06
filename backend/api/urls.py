from django.urls import path
from . import views

urlpatterns = [
    path("items/", views.ItemListCreate.as_view(),name="item-list"),
    path("items/update/<int:pk>/", views.ItemUpdate.as_view()),
    path("items/delete/<int:pk>/", views.ItemDelete.as_view(), name="delete-item"),
    path("me/", views.MeView.as_view(), name="me"),
    path("me/update/", views.UpdateMeView.as_view(), name="update-me"),
    path("conversations/", views.ConversationList.as_view(), name="conversation-list"),
    path("conversations/<int:conversation_id>/messages/", views.MessageListCreate.as_view(), name="message-list-create"),
    path("conversations/start/", views.StartConversationView.as_view(), name="start-conversation"),
    path("conversations/<int:conversation_id>/read/", views.mark_as_read),
    path('report/', views.SubmitReportView.as_view(), name='submit-report'),
]
