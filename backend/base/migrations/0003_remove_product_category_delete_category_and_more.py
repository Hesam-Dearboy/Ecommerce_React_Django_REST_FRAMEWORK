# Generated by Django 4.1.4 on 2023-02-27 10:59

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("base", "0002_remove_product_category_category_product_category"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="product",
            name="category",
        ),
        migrations.DeleteModel(
            name="Category",
        ),
        migrations.AddField(
            model_name="product",
            name="category",
            field=models.CharField(blank=True, max_length=200, null=True),
        ),
    ]