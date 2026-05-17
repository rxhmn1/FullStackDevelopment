from django.db import models


class Project(models.Model):

    title = models.CharField(max_length=100)

    description = models.TextField()

    tech = models.CharField(max_length=200)

    github = models.URLField()

    def __str__(self):

        return self.title

class Message(models.Model):

    name = models.CharField(max_length=100)

    email = models.EmailField()

    message = models.TextField()

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):

        return self.name