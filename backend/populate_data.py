import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'ecommerce_backend.settings')
django.setup()

from products.models import Product, Category

# Create categories
categories_data = [
    {'name': 'Electronics', 'description': 'Electronic devices and gadgets'},
    {'name': 'Fashion', 'description': 'Clothing and accessories'},
    {'name': 'Audio', 'description': 'Audio equipment and accessories'},
    {'name': 'Photography', 'description': 'Cameras and photography equipment'},
    {'name': 'Home', 'description': 'Home appliances and accessories'},
    {'name': 'Automotive', 'description': 'Car parts and accessories'},
    {'name': 'Luxury', 'description': 'Luxury items and accessories'},
]

for cat_data in categories_data:
    category, created = Category.objects.get_or_create(
        name=cat_data['name'],
        defaults={'description': cat_data['description']}
    )
    if created:
        print(f"Created category: {category.name}")

# Create products
products_data = [
    {
        'name': 'MacBook Pro M3',
        'price': 1999.00,
        'image': 'https://images.pexels.com/photos/205421/pexels-photo-205421.jpeg?auto=compress&cs=tinysrgb&w=500',
        'category': 'Electronics',
        'description': 'Latest MacBook Pro with M3 chip, 14-inch display, and incredible performance.',
        'rating': 4.8,
        'reviews_count': 124,
        'in_stock': True,
        'tags': ['laptop', 'apple', 'professional'],
        'featured': True
    },
    {
        'name': 'iPhone 15 Pro',
        'price': 999.00,
        'image': 'https://images.pexels.com/photos/47261/pexels-photo-47261.jpeg?auto=compress&cs=tinysrgb&w=500',
        'category': 'Electronics',
        'description': 'The most advanced iPhone with titanium design and A17 Pro chip.',
        'rating': 4.9,
        'reviews_count': 89,
        'in_stock': True,
        'tags': ['smartphone', 'apple', 'camera'],
        'featured': True
    },
    {
        'name': 'Sony WH-1000XM5',
        'price': 299.00,
        'image': 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=500',
        'category': 'Audio',
        'description': 'Premium noise canceling headphones with exceptional sound quality.',
        'rating': 4.7,
        'reviews_count': 156,
        'in_stock': True,
        'tags': ['headphones', 'wireless', 'noise-canceling'],
        'featured': False
    },
    {
        'name': 'Nike Air Max 270',
        'price': 150.00,
        'image': 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=500',
        'category': 'Fashion',
        'description': 'Comfortable running shoes with maximum cushioning and style.',
        'rating': 4.5,
        'reviews_count': 203,
        'in_stock': True,
        'tags': ['shoes', 'running', 'comfort'],
        'featured': True
    },
    {
        'name': 'Canon EOS R5',
        'price': 3499.00,
        'image': 'https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&w=500',
        'category': 'Photography',
        'description': 'Professional mirrorless camera with 45MP sensor and 8K video.',
        'rating': 4.9,
        'reviews_count': 67,
        'in_stock': False,
        'tags': ['camera', 'professional', '8k'],
        'featured': False
    },
    {
        'name': "Levi's 501 Jeans",
        'price': 89.00,
        'image': 'https://images.pexels.com/photos/1598507/pexels-photo-1598507.jpeg?auto=compress&cs=tinysrgb&w=500',
        'category': 'Fashion',
        'description': 'Classic straight-fit jeans with authentic vintage styling.',
        'rating': 4.4,
        'reviews_count': 178,
        'in_stock': True,
        'tags': ['jeans', 'classic', 'denim'],
        'featured': False
    },
    {
        'name': 'iPad Air M2',
        'price': 599.00,
        'image': 'https://images.pexels.com/photos/1334597/pexels-photo-1334597.jpeg?auto=compress&cs=tinysrgb&w=500',
        'category': 'Electronics',
        'description': 'Powerful tablet with M2 chip and stunning Liquid Retina display.',
        'rating': 4.6,
        'reviews_count': 142,
        'in_stock': True,
        'tags': ['tablet', 'apple', 'creative'],
        'featured': True
    },
    {
        'name': 'Adidas Ultraboost 22',
        'price': 180.00,
        'image': 'https://images.pexels.com/photos/1464625/pexels-photo-1464625.jpeg?auto=compress&cs=tinysrgb&w=500',
        'category': 'Fashion',
        'description': 'Energy-returning running shoes for ultimate performance.',
        'rating': 4.6,
        'reviews_count': 234,
        'in_stock': True,
        'tags': ['shoes', 'running', 'performance'],
        'featured': False
    },
    {
        'name': 'Samsung 65" OLED TV',
        'price': 1799.00,
        'image': 'https://images.pexels.com/photos/1201996/pexels-photo-1201996.jpeg?auto=compress&cs=tinysrgb&w=500',
        'category': 'Electronics',
        'description': '65-inch OLED TV with 4K resolution and smart features.',
        'rating': 4.7,
        'reviews_count': 98,
        'in_stock': True,
        'tags': ['tv', 'oled', '4k'],
        'featured': False
    },
    {
        'name': 'Dyson V15 Detect',
        'price': 749.00,
        'image': 'https://images.pexels.com/photos/4239037/pexels-photo-4239037.jpeg?auto=compress&cs=tinysrgb&w=500',
        'category': 'Home',
        'description': 'Intelligent cordless vacuum with laser detection technology.',
        'rating': 4.8,
        'reviews_count': 167,
        'in_stock': True,
        'tags': ['vacuum', 'cordless', 'smart'],
        'featured': False
    },
    {
        'name': 'Tesla Model Y Wheel',
        'price': 2500.00,
        'image': 'https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&cs=tinysrgb&w=500',
        'category': 'Automotive',
        'description': 'Premium 21-inch wheel set for Tesla Model Y.',
        'rating': 4.5,
        'reviews_count': 45,
        'in_stock': False,
        'tags': ['wheels', 'tesla', 'automotive'],
        'featured': False
    },
    {
        'name': 'Rolex Submariner',
        'price': 8100.00,
        'image': 'https://images.pexels.com/photos/277319/pexels-photo-277319.jpeg?auto=compress&cs=tinysrgb&w=500',
        'category': 'Luxury',
        'description': 'Iconic diving watch with exceptional craftsmanship.',
        'rating': 4.9,
        'reviews_count': 23,
        'in_stock': True,
        'tags': ['watch', 'luxury', 'diving'],
        'featured': False
    }
]

for product_data in products_data:
    category = Category.objects.get(name=product_data['category'])
    product_data['category'] = category
    
    product, created = Product.objects.get_or_create(
        name=product_data['name'],
        defaults=product_data
    )
    if created:
        print(f"Created product: {product.name}")

print("Data population completed!")