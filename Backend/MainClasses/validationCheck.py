import numpy as np
from tensorflow import keras
from keras.preprocessing import image
from keras.models import Sequential

def predictFromArray(arr):
    result = classifier.predict(arr)
    for i in range(len(result[0])):
       if(result[0][i]>0.75):
           return (labels[i])


labels = ['+', '-', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9','=','x', 'y']

classifier=keras.models.load_model('../Models/EquationModel6.h5')

# print(classifier.summary())


# path = '../Dataset/Junk/test/1/00000.png'


# img = image.load_img(path, target_size=(28, 28))
# x = image.img_to_array(img)
# x = np.expand_dims(x, axis=0)

# images = np.vstack([x])
# classes = model.predict(images, batch_size=10)

# equation=predictFromArray(x)
# print(equation)

import os
path1 = '../Dataset/Junk/test/'
# path = '../Dataset/pickle/+/3.png'
path2='../Dataset/myown/'
equ=['+','-','0','1','2','3','4','5','6','7','8','9','=','x','y']

# x=-1
# for root, dirs, files in os.walk(path):
#     for d in dirs:
#         x+=1
#         zeroCount=0
#         notzeroCOunt=0
#         for root, dirs, filess in os.walk(d):
#             for fname in filess:
#                 print(fname)
#                 img = image.load_img(path+fname, target_size=(28, 28))
#                 x = image.img_to_array(img)
#                 x = np.expand_dims(x, axis=0)

#                 # images = np.vstack([x])
#                 # classes = model.predict(images, batch_size=10)

#                 equation=predictFromArray(x)
#                 if(equation==equ[x]):
#                     zeroCount+=1
#                 else:
#                     notzeroCOunt+=1
#             print('Correct',zeroCount,equ[x],d)
#             print('Wrong',notzeroCOunt)
# print(equation)
def customCheck():
    zeroCount=0
    notzeroCOunt=0
    for root, dirs, files in os.walk(path2):
        for fname in files:
                        print(fname)
                        img = image.load_img(path2+fname, target_size=(28, 28))
                        x = image.img_to_array(img)
                        x = np.expand_dims(x, axis=0)

                        # images = np.vstack([x])
                        # classes = model.predict(images, batch_size=10)

                        equation=predictFromArray(x)
                    #     if(equation==equ[x]):
                    #         zeroCount+=1
                    #     else:
                    #         notzeroCOunt+=1
                    # print('Correct',zeroCount)
                    # print('Wrong',notzeroCOunt)
        print(equation)


def folderCheck():
    a=-1
    for root,dirs,files in os.walk(path1):
        for folder in dirs:
            a+=1
            zeroCount=0
            notzeroCOunt=0
            for root,dirs,files in os.walk(path1+folder):
                for fname in files:
                    # print(fname)
                    img = image.load_img(path1+folder+'/'+fname, target_size=(28, 28))
                    x = image.img_to_array(img)
                    x = np.expand_dims(x, axis=0)
                    equation=predictFromArray(x)
                    if(equation==equ[a]):
                        zeroCount+=1
                    else:
                        notzeroCOunt+=1
                print('Correct',zeroCount,equ[a],folder)
                print('Wrong',notzeroCOunt)
                print('Correct Percentage',(zeroCount/(zeroCount+notzeroCOunt))*100)

customCheck()