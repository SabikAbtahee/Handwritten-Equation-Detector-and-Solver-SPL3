# from modelMaking import ModelMaking
from imageProcessing import ImageConversions
from segmentation import Symbol, startSegmentation
from reconstruction import reconstruct
import os
import sys
# later it will be used as rest api or not at all
imagePath = '../Equations/Equ14.jpg'
allimage = '../Equations/'
imgConversions = ImageConversions()


def makemodel():
    modelName = 'EquationModel6.h5'

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
def process(imageofequation):

    img = imgConversions.convertOnlyto255and0(imageofequation)
    # imgConversions.plotImageUsingCV(img)
    img = imgConversions.erode(img)
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


# def reconstruction():
#     pass


def main():  # the rest api will send a image until then work with a single path image object
    # allpath()
    runEachFile(imagePath)


def runEachFile(path):
    imageObject = imgConversions.openImageUsingCV(path)
    if imageObject is not None:
            print('Image object detected')
            preprocessedImage = process(imageObject)
            symbols = segment(preprocessedImage)
            equation = reconstruction(preprocessedImage, symbols)
            print(equation)


def allpath():

    for root, dirs, files in os.walk(allimage):
        for fname in files:
            if (fname.endswith('.jpg') or fname.endswith('.png')):
                path = allimage+fname
                runEachFile(path)


if __name__ == '__main__':
    main()
