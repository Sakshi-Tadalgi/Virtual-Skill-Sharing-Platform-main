from django.urls import path
from .views import MessagingListView

urlpatterns = [
    path('messages/', MessagingListView.as_view(), name='message_list'),
]