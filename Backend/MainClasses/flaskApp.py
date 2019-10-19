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

from flask_cors import CORS
# from load import *

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


def startServer():
    port = int(os.environ.get('PORT', 8080))
    app.run(host='0.0.0.0', port=8080)


if __name__ == '__main__':
    startServer()
