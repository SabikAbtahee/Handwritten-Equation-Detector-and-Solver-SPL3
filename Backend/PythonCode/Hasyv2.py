from IPython.display import Image
import cv2
import numpy as np
import csv
from PIL import Image as pil_image
import keras.preprocessing.image

imgs=[]
classes=[]
with open('../Dataset/Junk/hasy-data-labels.csv') as csvfile:
    csvreader=csv.reader(csvfile)
    i=0
    for row in csvreader:
        if i > 0:
            img = keras.preprocessing.image.img_to_array(pil_image.open('../Dataset/Junk/'+row[0]))
            img/=255.0
            imgs.append((row[0],row[2],img))
            classes.append(row[2])
        i+=1
        
import random
random.shuffle(imgs)
split_idx = int (0.8*len(imgs))
train=imgs[:split_idx]
test=imgs[split_idx:]

import numpy as np
train_input = np.asarray(list(map(lambda row: row[2], train)))
test_input = np.asarray(list(map(lambda row: row[2],test)))

train_output = np.asarray(list(map(lambda row: row[1], train)))
test_output = np.asarray(list(map(lambda row: row[1],test)))

from sklearn.preprocessing import LabelEncoder
from sklearn.preprocessing import OneHotEncoder

label_encoder = LabelEncoder()
integer_encoded = label_encoder.fit_transform(classes)

onehot_encoder = OneHotEncoder(sparse=False)
integer_encoded= integer_encoded.reshape(len(integer_encoded),1)
onehot_encoder.fit(integer_encoded)


train_output_int = label_encoder.transform(train_output)
train_output = onehot_encoder.transform(train_output_int.reshape(len(train_output_int),1))
test_output_int = label_encoder.transform(test_output)
test_output = onehot_encoder.transform(test_output_int.reshape(len(test_output_int),1))

num_classes = len(label_encoder.classes_)
print('Number of classes %d' % num_classes)

from keras.models import Sequential
from keras.layers import Dense, Dropout, Flatten
from keras.layers import Conv2D, MaxPooling2D

import keras.callbacks
tensorboard = keras.callbacks.TensorBoard(log_dir='./logs/mnist-style')

model = Sequential()
model.add(Conv2D(32,(3,3), activation='relu',input_shape=np.shape(train_input[0])))
model.add(MaxPooling2D(pool_size=(2,2)))
model.add(Conv2D(32,(3,3),activation='relu'))
model.add(MaxPooling2D(pool_size=(2,2)))
model.add(Flatten())
model.add(Dense(128,activation='tanh'))
model.add(Dropout(0.5))

model.add(Dense(num_classes,activation='softmax'))
model.compile(loss='categorical_crossentropy',optimizer='adam',metrics=['accuracy'])

print(model.summary)

model.fit(np.concatenate((train_input,test_input)),
         np.concatenate((train_output,test_output)),
         batch_size=32,epochs=10,verbose=2)
model.save('mathsymbols.model')

np.save('classes.npy',label_encoder.classes_)

import keras.models
model2=keras.models.load_model('mathsymbols.model')
print(model2.summary)

label_encoder2 = LabelEncoder()
label_encoder2.classes_=np.load('classes.npy')

def predict(img_path):
    newimg = keras.preprocessing.image.img_to_array(pil_image.open(img_path))
    newimg /=255.0
    
    prediction = model2.predict(newimg.reshape(1,32,32,3))
    
    inverted = label_encoder2.inverse_transform([np.argmax(prediction)])
    print('Prediction: %s, confidence: %.2f' % (inverted[0], np.max(prediction)))
    