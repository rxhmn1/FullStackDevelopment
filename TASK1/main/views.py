from django.shortcuts import render

from .models import Project, Message

def home(request):

    if request.method == 'POST':

        name = request.POST.get('name')

        email = request.POST.get('email')

        message = request.POST.get('message')

        Message.objects.create(

            name=name,
            email=email,
            message=message

        )

    projects = Project.objects.all()

    context = {

        'projects': projects

    }

    return render(request, 'main/home.html', context)