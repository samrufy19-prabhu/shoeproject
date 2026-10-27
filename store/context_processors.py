from django.conf import settings
from .models import Cart, Category


def cart_context(request):
    total_items = 0
    cart = None

    if request.user.is_authenticated:
        cart = Cart.objects.filter(user=request.user).first()
    else:
        if not request.session.session_key:
            request.session.create()
        session_key = request.session.session_key
        cart = Cart.objects.filter(session_key=session_key).first()

    if cart:
        total_items = cart.total_items

    categories = Category.objects.all().order_by('id')

    return {
        'cart_total_items': total_items,
        'global_categories': categories,
        'RAZORPAY_KEY_ID': getattr(settings, 'RAZORPAY_KEY_ID', ''),
    }
