from imageProcessing import ImageConversions
import numpy as np
from tensorflow import keras
# import keras
from keras.preprocessing import image
from keras.models import Sequential
import tensorflow as tf
from keras.models import model_from_json
from keras.utils import CustomObjectScope
from keras.initializers import glorot_uniform
from tensorflow.python.keras.backend import set_session
labels = ['+', '-', '0', '1', '2', '3', '4',
          '5', '6', '7', '8', '9', '=', 'x', 'y']
# classifier = keras.models.load_model('../Models/EquationModel6.h5')
# classifier = keras.models.load_model('EquationModel10.h5')
imgConversions = ImageConversions()
width = 28
height = 28
CompleteSymbols = []


# def init():
# 	json_file = open('../Models/model_json.json', 'r')
# 	loaded_model_json = json_file.read()
# 	json_file.close()
# 	loaded_model = tf.keras.models.model_from_json(loaded_model_json)
# 	# load woeights into new model
#     # with CustomObjectScope({'GlorotUniform': glorot_uniform()}):
#     #     loaded_model.load_weights("../Models/Model.h5")

#         # model = load_model('imdb_mlp_model.h5')

# 	loaded_model.load_weights("../Models/Model.h5")
# 	print("Loaded Model from disk")

# 	# compile and evaluate loaded model
# 	loaded_model.compile(loss='categorical_crossentropy',
# 	                     optimizer='rmsprop', metrics=['accuracy'])
# 	# loss,accuracy = model.evaluate(X_test,y_test)
# 	# print('loss:', loss)
# 	# print('accuracy:', accuracy)
#     sess = tf.Session()
#     graph = tf.compat.v1.get_default_graph()
# 	return loaded_model,graph,sess


def init():
    json_file=open('../Models/model_json.json','r')
    loaded_model_json=json_file.read()
    json_file.close()
    sess=tf.Session()
    loaded_model=tf.keras.models.model_from_json(loaded_model_json)
    set_session(sess)
    loaded_model.load_weights('../Models/EquationModel6.h5')
    loaded_model.compile(loss='categorical_crossentropy',optimizer='rmsprop',metrics=['accuracy'])
    
    graph=tf.compat.v1.get_default_graph()
    return loaded_model,graph,sess

global classifier,graph
global sess
classifier,graph,sess=init()

# classifier = keras.models.load_model('../Models/EquationModel6.h5')
# classifier._make_predict_function()
# graph=tf.compat.v1.get_default_graph()



def reconstruct(preprocessedImage, symbols):
    # classifier=model
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
    with graph.as_default():
        set_session(sess)
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
    if(symbol.isSquare == True and symbol.isdenominator==False and symbol.isNominator==False):
        if(character.isdigit()):
            symbol.character = '^'+character
        else:
            symbol.character = character
    if(symbol.isVerticalBar == True):
        symbol.character = '1'
    if(symbol.isDot == True):
        symbol.position = -1
    if(symbol.isMinus == True):
        symbol.character = '-'
    if(symbol.isDivide == True):
        symbol.character = '/'
    if(symbol.isNominatorFirst==True):
        symbol.character = '(('+character
    if(symbol.isNominatorLast==True):
        symbol.character = character+')'
    if(symbol.isdenominatorFirst==True):
        symbol.character = '('+character   
    if(symbol.isdenominatorLast==True):
        symbol.character = character+'))'
    if(symbol.isdenominatorFirst==True and symbol.isdenominatorLast==True):
        symbol.character = '('+character+'))'
    if(symbol.isNominatorFirst==True and symbol.isNominatorLast==True):
        symbol.character = '(('+character+')'
    return symbol


def FormEquation():
    equation = ''
    for i in CompleteSymbols:
        if(i.position >= 0 ):
            if(i.character=='x'):
                position=CompleteSymbols.index(i)
                length=len(CompleteSymbols)
                if(position-1>=0 and position+1<length):
                    if(CompleteSymbols[position-1].character.isdigit() and CompleteSymbols[position+1].character.isdigit()):
                        equation+='*'
                    else:
                        equation+='x'
                else:
                    equation+=i.character
            else:
                equation += i.character

    return equation

# def FormEquation():
#     equation=''
#     for i in CompleteSymbols:
#         equation += i.character
#     return checkEquation(equation)

# def checkEquation(equationString):
    
#     comb=['xx','xy','yx','yy']
#     for i in range(0,len(equationString)-1,1):
#         a=equationString[i]+equationString[i+1]
#         if(a in comb):
#             equationString=equationString[0:i+1]+'*'+equationString[i+1:len(equationString)]
#     return equationString