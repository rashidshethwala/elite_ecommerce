from rest_framework import serializers
from .models import Product, Category

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'

class ProductSerializer(serializers.ModelSerializer):
    category_name = serializers.CharField(source='category.name', read_only=True)
    
    class Meta:
        model = Product
        fields = '__all__'
    
    def to_representation(self, instance):
        data = super().to_representation(instance)
        # Convert to match frontend format
        data['reviews'] = data.pop('reviews_count')
        data['inStock'] = data.pop('in_stock')
        return data