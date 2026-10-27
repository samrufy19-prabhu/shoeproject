from django.urls import path
from . import views

urlpatterns = [
    path('', views.home_view, name='home'),
    path('category/<slug:slug>/', views.category_view, name='category'),
    path('product/<slug:slug>/', views.product_detail_view, name='product_detail'),
    path('cart/', views.cart_view, name='cart'),
    path('cart/add/<int:product_id>/', views.add_to_cart, name='add_to_cart'),
    path('cart/update/<int:item_id>/', views.update_cart_item, name='update_cart_item'),
    path('cart/remove/<int:item_id>/', views.remove_from_cart, name='remove_from_cart'),
    path('checkout/', views.checkout_view, name='checkout'),
    path('payment/razorpay-verify/', views.razorpay_payment_verify, name='razorpay_verify'),
    path('order-success/<str:order_number>/', views.order_success_view, name='order_success'),
    path('about/', views.about_view, name='about'),
    path('contact/', views.contact_view, name='contact'),
    path('login/', views.login_view, name='login'),
    path('logout/', views.logout_view, name='logout'),
]
