from imageProcessing import ImageConversions
import numpy as np
from tensorflow import keras
from keras.preprocessing import image
from keras.models import Sequential
labels = ['+', '-', '0', '1', '2', '3', '4',
          '5', '6', '7', '8', '9', '=', 'x', 'y']
# classifier = keras.models.load_model('../Models/EquationModel6.h5')
classifier = keras.models.load_model('EquationModel10.h5')
imgConversions = ImageConversions()
width = 28
height = 28
CompleteSymbols = []


def reconstruct(preprocessedImage, symbols):
    CompleteSymbols.clear()
    symbols.sort(key=lambda x: x.position, reverse=False)
    for i in range(len(symbols)):
        # i+=6
        if(symbols[i].position >= 0):
            img = imgConversions.cropImage(preprocessedImage, symbols[i].y, (
                symbols[i].y+symbols[i].height), symbols[i].x, (symbols[i].x+symbols[i].width))
            # print(symbols[i].x,symbols[i].y)
            # img = imgConversions.cropImage(preprocessedImage, 140, 197, 474, 614)
            # imgConversions.plotImageUsingCV(img)
            img = imgConversions.makeBorder(img,6)
            # img = imgConversions.erodewithParam(img, 2, 2, 1)
            img = imgConversions.graytobgr(img)
            img = imgConversions.resize(img, width, height)
            # imgConversions.plotImageUsingCV(img)
            predictionShaped = imgConversions.expandShape(img, 0)
            x = predictFromArray(predictionShaped)
            CompleteSymbols.append(makeCharacter(x, symbols[i]))
    # return 'ss'
    return FormEquation()


def predictFromArray(arr):
    result = classifier.predict(arr)
    index = np.argmax(result[0])
    return (labels[index])
    # for i in range(len(result[0])):
    #     print(result[0][i],labels[i],i)
    #     if(result[0][i] > 0.85):
    #         return (labels[i])


def makeCharacter(character, symbol):
    if(symbol.character != ''):
        return symbol
    if(symbol.character == ''):
        symbol.character = character
    if(symbol.isSquare == True):
        if(character.isdigit()):
            symbol.character = '^'+character
        else:
            symbol.character = '^2'
    if(symbol.isVerticalBar == True):
        symbol.character = '1'
    if(symbol.isDot == True):
        symbol.position = -1
    if(symbol.isMinus == True):
        symbol.character = '-'
    return symbol


def FormEquation():
    equation = ''
    for i in CompleteSymbols:
        # print(i.position, i.character)
        if(i.position >= 0):
            equation += i.character
    return equation
    # return 's'
