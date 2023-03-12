from base.views import order_views
from django.urls import path 



urlpatterns = [
    path('' , order_views.getOrders , name='orders'),
    path('add/' , order_views.addOrderItems , name='orders_add'),
    path('myorders/' , order_views.getMyOrders , name='my_orders'),

    path('<str:pk>/deliver/' , order_views.updateOrderToDelivered , name='order-deliver'),


    path('<str:pk>/' , order_views.getOrderById , name='user_order'),
    path('<str:pk>/pay/' , order_views.updateOrderToPaid , name='paid'),
    

]