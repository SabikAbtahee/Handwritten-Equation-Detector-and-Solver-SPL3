from modelMaking import ModelMaking
from imageProcessing import ImageConversions
from segmentation import Symbol, startSegmentation
from reconstruction import reconstruct
import os
import sys
from tensorflow import keras
import json
from flask import Flask, render_template, request, flash, redirect, url_for
from werkzeug.utils import secure_filename
import cv2
import numpy as np
import base64 as baseConversion
from flask_cors import CORS
from io import StringIO
# from load import *
from PIL import Image
import io
from imageio import imread
#######   FLASK #################
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}
app = Flask(__name__)
cors = CORS(app, resources={r"/*": {"origins": "*"}})
imgConversions = ImageConversions()


def process(img, thresh):
    img = imgConversions.convertOnlyto255and0WithThresh(img, thresh)
    img = imgConversions.erodewithParam(img, 2, 2, 1)
    img = imgConversions.makeTextWhite(img)
    return img


def segment(preprocessedImage):
    symbols = startSegmentation(preprocessedImage)
    return symbols


def reconstruction(preprocessedImage, symbols):
    equation = reconstruct(preprocessedImage, symbols)
    return equation


def prediction(file):

    data = {}

    thresh = 127
    imageObject = imgConversions.openImageUsingPillow(file)
    imageObject = np.array(imageObject)
    # print(imageObject)
    if imageObject is not None:
        while(True):
            preprocessedImage = process(imageObject, thresh)
            symbols = segment(preprocessedImage)
            if(len(symbols) > 30):
                thresh -= 10
            else:
                equation = reconstruction(preprocessedImage, symbols)
                data['equation'] = str(equation)
                json_data = json.dumps(data)

                return json_data

def stringToImage(base64_string):
    imgdata = baseConversion.b64decode(base64_string)
    return Image.open(io.BytesIO(imgdata))

# convert PIL Image to an RGB image( technically a numpy array ) that's compatible with opencv
def toRGB(image):
    return cv2.cvtColor(np.array(image), cv2.COLOR_BGR2RGB)

def predictionBase64(base64string):
    data = {}
    base64string += "=" * ((4 - len(base64string) % 4) % 4) #ugh
    
    # imag=baseConversion.b64decode(base64string)
    # image=decode_base64(base64string)
    thresh = 127
    # imageObject = imgConversions.openImageUsingPillow(imag)
    # imageObject = np.array(im)
    # print(img)
    img=stringToImage(base64string)
    imageObject=toRGB(img)


    if imageObject is not None:
        while(True):
            preprocessedImage = process(imageObject, thresh)
            symbols = segment(preprocessedImage)
            if(len(symbols) > 30):
                thresh -= 10
            else:
                equation = reconstruction(preprocessedImage, symbols)
                data['equation'] = str(equation)
                json_data = json.dumps(data)
                return json_data
    # return 's'



def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


@app.route('/predict', methods=['GET', 'POST'])
def predict():
    if request.method == 'POST':
        if 'file' not in request.files:
            return 'No File Found'
        file = request.files['file']
        if file.filename == '':
            flash('No selected file')
            return 'No selected file'
        if file and allowed_file(file.filename):
            response = prediction(file)
            return response


@app.route('/predictBase64', methods=['GET', 'POST'])
def predictBase64():
    if request.method == 'POST':
        data = request.get_json()
        # print(data);
        # print(data['base64'])
        if(data['base64']):
            baseImageString = data['base64']
            response=predictionBase64(baseImageString)
            return response
        
        else:
            return 'Corrupted image'
        


def startServer():
    port = int(os.environ.get('PORT', 8080))
    app.run(host='0.0.0.0', port=8080)


if __name__ == '__main__':
    startServer()
