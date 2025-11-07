from django.db import models

class Document(models.Model):
    TYPE_CHOICES = (
        ('contract', 'Sözleşme'),
        ('promissory_note', 'Senet'),
    )

    name = models.CharField(max_length=255)
    type = models.CharField(max_length=20, choices=TYPE_CHOICES)
    content = models.TextField()
    version = models.PositiveIntegerField(default=1)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.name} (v{self.version})"