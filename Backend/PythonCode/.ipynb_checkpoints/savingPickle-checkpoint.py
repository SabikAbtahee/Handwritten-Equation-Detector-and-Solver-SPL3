import numpy as np
import matplotlib.pyplot as plt
import os
import cv2
from tqdm import tqdm
import pickle


DATADIR = "../Dataset/pickle2"
CATEGORIES=["-","(",")","{","}","[","]","+","=","0","1","2","3","4","5","6","7","8","9","gt","lt","n","pi","sqrt","X","y"]

training_data = []

def create_training_data():
    for category in CATEGORIES:  # do dogs and cats

        path = os.path.join(DATADIR,category)  # create path to dogs and cats
        class_num = CATEGORIES.index(category)  # get the classification  (0 or a 1). 0=dog 1=cat

        for img in tqdm(os.listdir(path)):  # iterate over each image per dogs and cats
            try:
                img_array = cv2.imread(os.path.join(path,img) ,cv2.IMREAD_GRAYSCALE)  # convert to array
                training_data.append([img_array, class_num])  # add this to our training_data
            except Exception as e:  # in the interest in keeping the output clean...
                pass
            #except OSError as e:
            #    print("OSErrroBad img most likely", e, os.path.join(path,img))
            #except Exception as e:
            #    print("general exception", e, os.path.join(path,img))

create_training_data()

print(len(training_data))

IMG_SIZE=28
X = []
y = []

for features,label in training_data:
    X.append(features)
    y.append(label)
X = np.array(X).reshape(-1, IMG_SIZE, IMG_SIZE, 1)



pickle_out = open("X2.pickle","wb")

pickle.dump(X, pickle_out)
pickle_out.close()

pickle_out = open("y2.pickle","wb")
pickle.dump(y, pickle_out)
pickle_out.close()