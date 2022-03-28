from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

# Create your views here.
from . import util

def home(request):
    return render(request,'app.html',{})

@csrf_exempt
def classify(request):
    if request.method == "POST":
        #print(request.POST['image_data']) base 64 encoded image
        arr = util.classify_image(request.POST['image_data'])
        max = arr[0]
        for i in range(len(arr)-1):
            if arr[i]['prob'] < arr[i+1]['prob']:
                max = arr[i+1]
        print(max['class'])
        return JsonResponse(max)

