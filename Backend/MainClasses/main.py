from modelMaking import ModelMaking
from imageProcessing import ImageConversions
from segmentation import Symbol, startSegmentation
from reconstruction import reconstruct
import os
import sys
from tensorflow import keras
import cv2
from flask import Flask, render_template, request,flash, redirect, url_for
from werkzeug.utils import secure_filename
# from load import *
import numpy as np

#######   FLASK #################
UPLOAD_FOLDER = '../Uploads/'
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}
app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# global model
# model = keras.models.load_model('../Models/EquationModel6.h5')







# later it will be used as rest api or not at all
# imagePath = '../Equations/Equ1.jpg'
imagePath = '../Equations/Equ2Folder/Equ4.jpg'
allimage = '../Equations/testEqual/'
# allimage = '../Uploads/'

imgConversions = ImageConversions()


def makemodel():
    modelName = 'Model.h5'
    # modelClass = ModelMaking()
    # modelClass.kernel_size = (2, 2)
    # modelClass.first_convolutional_layer = 128
    # modelClass.second_convolutional_layer = 256
    # modelClass.hiddenLayer = 512
    # modelClass.maxPooling = (2, 2)
    # modelClass.dropout = 0.5
    # modelClass.epochNumber = 5
    # modelClass.optimizer = 'adam'
    # train_generator, validation_generator = modelClass.trainTestGenerator()
    # model = modelClass.modelConfiguration()
    # history = modelClass.compileModel(
    #     model, train_generator, validation_generator, modelName)
    # modelClass.showChart(history)
    modelClass = ModelMaking()
    modelClass.kernel_size = (2, 2)
    modelClass.first_convolutional_layer = 256
    modelClass.second_convolutional_layer = 128
    modelClass.hiddenLayer = 512
    modelClass.maxPooling = (2, 2)
    modelClass.dropout = 0.3
    modelClass.epochNumber = 5
    modelClass.optimizer = 'rmsprop'
    train_generator, validation_generator = modelClass.trainTestGenerator()
    model = modelClass.modelConfiguration()
    history = modelClass.compileModel(
        model, train_generator, validation_generator, modelName)
    modelClass.showChart(history)


# removes noise and gives back a black and white grayscale image where the text is white
def process(img,thresh):
    img = imgConversions.convertOnlyto255and0WithThresh(img,thresh)
    # imgConversions.plotImageUsingCV(img)
    img = imgConversions.erodewithParam(img,2,2,1)
    # imgConversions.plotImageUsingCV(img)
    img = imgConversions.makeTextWhite(img)
    # imgConversions.plotImageUsingCV(img)
    return img


def segment(preprocessedImage):  # does initial segmentation and gives out a list of symbol objects
    symbols = startSegmentation(preprocessedImage)
    return symbols


def reconstruction(preprocessedImage, symbols):
    # crop=imgConversions.cropImage(preprocessedImage,75,106,1021,1137)
    # imgConversions.plotImageUsingCV(crop)
    equation = reconstruct(preprocessedImage, symbols)
    return equation
    # print(i.info())



def main():  # the rest api will send a image until then work with a single path image object
    # makemodel()
    allpath()
    # runEachFile(imagePath)
    # test()


def runEachFile(path):
    thresh=127
    imageObject = imgConversions.openImageUsingCV(path)
    if imageObject is not None:
            while(True):
                # print('Image object detected')
                preprocessedImage = process(imageObject,thresh)
                symbols = segment(preprocessedImage)
                # print(len(symbols))
                if(len(symbols)>30):
                    thresh-=10
                else:
                    equation = reconstruction(preprocessedImage, symbols)
                    print(path,equation)
                    # return equation
                    break


def allpath():
    for root, dirs, files in os.walk(allimage):
        for fname in files:
            if (fname.endswith('.jpg')):
                path = allimage+fname
                runEachFile(path)





def flaskBackend():
    port = int(os.environ.get('PORT',8080))
    app.run(host='0.0.0.0',port=8080)
    
def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def test():
    for root, dirs, files in os.walk(allimage):
        for fname in files:
            if (fname.endswith('.jpg')):
                path = allimage+fname
                return runEachFile(path)

def testDirect(file):
    print(file)
    print(type(file))
           
    # imageObject = cv2.imdecode(np.fromstring(file.read(), np.uint8), cv2.CV_LOAD_IMAGE_COLOR)
    thresh=127
    # imageObject = imgConversions.openImageUsingCV(file)
    imageObject=imgConversions.openImageUsingPillow(file)
    imageObject = np.array(imageObject)
    if imageObject is not None:
            while(True):
                # print('Image object detected')
                preprocessedImage = process(imageObject,thresh)
                symbols = segment(preprocessedImage)
                # print(len(symbols))
                if(len(symbols)>30):
                    thresh-=10
                else:
                    equation = reconstruction(preprocessedImage, symbols)
                    print(equation)
                    return equation
                    break

@app.route('/predict', methods=['GET','POST'])
def predict():
    # test()
    if request.method == 'POST':
        if 'file' not in request.files:
            # flash('No file part')
            return 'No File Found'
        file = request.files['file']
        if file.filename == '':
            flash('No selected file')
            return 'No selected file'
        if file and allowed_file(file.filename):
            filename = secure_filename(file.filename)
            file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
            x=testDirect(file)
            # x=test()
            # print(x)
            return str(x)
    # imgData = request.get_data()
    # response=test(imgData)
    # return response
    # return 'SABIk'

if __name__ == '__main__':
    main()
    # flaskBackend()