from django.db import models
from core.models import Person, Branch

class Receipt(models.Model):
    TYPE_CHOICES = (
        ('person', 'Kişi'),
        ('branch', 'Şube'),
    )

    type = models.CharField(max_length=20, choices=TYPE_CHOICES)
    person = models.ForeignKey(Person, on_delete=models.CASCADE, null=True, blank=True)
    branch = models.ForeignKey(Branch, on_delete=models.CASCADE, null=True, blank=True)
    description = models.TextField()
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    date = models.DateField()
    file = models.FileField(upload_to='receipts/')

    def __str__(self):
        return self.description