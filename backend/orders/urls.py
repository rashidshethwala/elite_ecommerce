from django.urls import path
from . import views

urlpatterns = [
    path('', views.OrderListView.as_view(), name='order-list'),
    path('<int:pk>/', views.OrderDetailView.as_view(), name='order-detail'),
    path('cart/', views.get_cart, name='get-cart'),
    path('cart/add/', views.add_to_cart, name='add-to-cart'),
    path('cart/update/<int:item_id>/', views.update_cart_item, name='update-cart-item'),
    path('cart/remove/<int:item_id>/', views.remove_from_cart, name='remove-from-cart'),
    path('cart/clear/', views.clear_cart, name='clear-cart'),
    path('create/', views.create_order, name='create-order'),
]