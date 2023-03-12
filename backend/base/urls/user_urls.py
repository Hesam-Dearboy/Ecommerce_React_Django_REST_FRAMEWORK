from base.views import user_views
from django.urls import path 



urlpatterns = [
    path('login/', user_views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('profile/' , user_views.getUserProfile , name='users_profile'),
    path('profile/update/' , user_views.updateUserProfile , name='update_users_profile'),
    path('verifycode/' , user_views.verifyCode , name='verify_code'),
    path('resendcode/' , user_views.resendCode , name='resend_code'),
    path('' , user_views.getUsers, name='users'),
    path('register/' , user_views.registerUser , name='users_register'),
   
    path('<str:pk>/' , user_views.getUserById, name='user'),
    path('delete/<str:pk>/' , user_views.deleteUser, name='user-delete'),
    path('update/<str:pk>/' , user_views.updateUser, name='user-update'),
]