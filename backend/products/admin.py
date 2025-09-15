from django.contrib import admin
from .models import Product, Category

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'created_at')
    search_fields = ('name',)

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('name', 'category', 'price', 'rating', 'in_stock', 'featured')
    list_filter = ('category', 'in_stock', 'featured', 'created_at')
    search_fields = ('name', 'description')
    list_editable = ('price', 'in_stock', 'featured')