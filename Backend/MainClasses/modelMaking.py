

import tensorflow as tf
import keras_preprocessing
from keras_preprocessing import image
from keras_preprocessing.image import ImageDataGenerator
from keras.models import Sequential
from keras.layers import Convolution2D
from keras.layers import MaxPooling2D
from keras.layers import Flatten
from keras.layers import Dense
from keras.layers import Dropout
from matplotlib import pyplot as plt


class ModelMaking:
    equationModelCategories = ['0', '1', '2', '3', '4',
                               '5', '6', '7', '8', '9', '+', '-', 'x', 'y', '=']
    allCategories = ["-", "(", ")", "{", "}", "[", "]", "+", "=", "0", "1", "2",
                     "3", "4", "5", "6", "7", "8", "9", "gt", "lt", "n", "pi", "sqrt", "x", "y"]

    TRAINING_DIR = "../Dataset/ImageModel2Dilated/train/"
    VALIDATION_DIR = "../Dataset/ImageModel2Dilated/test/"

    height = 28
    width = 28

    number_of_classes = len(equationModelCategories)
    kernel_size = (4, 4)
    inputShape = (28, 28, 3)
    first_convolutional_layer = 32
    second_convolutional_layer = 64
    third_convolutional_layer = 128
    fourth_convolutional_layer = 128
    hiddenLayer = 256
    maxPooling = (2, 2)
    dropout = 0.3
    optimizer = 'adam'  # 'rmsprop'
    epochNumber = 10

    def trainTestGenerator(self):
        shift = 0.1
        training_datagen = ImageDataGenerator(
            rescale=1./255, featurewise_center=True, featurewise_std_normalization=True, zca_whitening=True,width_shift_range=shift, height_shift_range=shift,zoom_range=0.1)
        validation_datagen = ImageDataGenerator(
            rescale=1./255, featurewise_center=True, featurewise_std_normalization=True, zca_whitening=True,width_shift_range=shift, height_shift_range=shift,zoom_range=0.1)

        train_generator = training_datagen.flow_from_directory(
            self.TRAINING_DIR,
            target_size=(self.height, self.width),
            class_mode='categorical'
        )

        validation_generator = validation_datagen.flow_from_directory(
            self.VALIDATION_DIR,
            target_size=(self.height, self.width),
            class_mode='categorical'
        )
        print(train_generator.class_indices)
        return train_generator, validation_generator

    def modelConfiguration(self):

        classifier = tf.keras.models.Sequential([
            tf.keras.layers.Conv2D(
                self.first_convolutional_layer, self.kernel_size, activation='relu', input_shape=self.inputShape),
            tf.keras.layers.MaxPooling2D(self.maxPooling),
            # The second convolution
            tf.keras.layers.Conv2D(
                self.second_convolutional_layer, self.kernel_size, activation='relu'),
            tf.keras.layers.MaxPooling2D(self.maxPooling),
            # The third convolution
            # tf.keras.layers.Conv2D(
            #     self.third_convolutional_layer, self.kernel_size, activation='relu'),
            # tf.keras.layers.MaxPooling2D(self.maxPooling),
            # The fourth convolution
            # tf.keras.layers.Conv2D(
            #     self.fourth_convolutional_layer, self.kernel_size, activation='relu'),
            # tf.keras.layers.MaxPooling2D(self.maxPooling),
            # Flatten the results to feed into a DNN
            tf.keras.layers.Flatten(),
            tf.keras.layers.Dropout(self.dropout),
            # 512 neuron hidden layer
            tf.keras.layers.Dense(self.hiddenLayer, activation='relu'),
            tf.keras.layers.Dense(self.number_of_classes, activation='softmax')
        ])

        # classifier = Sequential()
        # classifier.add(Convolution2D(self.first_convolutional_layer,self.kernel_size,input_shape=self.inputShape,activation='relu'))

        # classifier.add(MaxPooling2D(pool_size=self.maxPooling))

        # classifier.add(Convolution2D(self.second_convolutional_layer, self.kernel_size, activation='relu'))

        # classifier.add(MaxPooling2D(pool_size=self.maxPooling))
        # classifier.add(Flatten())

        # classifier.add(Dense(units= self.hiddenLayer,activation='relu'))
        # classifier.add(Dropout(rate=self.dropout))
        # classifier.add(Dense(units=self.number_of_classes,activation='softmax'))
        # classifier.add(Dropout(rate=0.1))

        return classifier

    def compileModel(self, model, train_generator, validation_generator, modelName):

        model.compile(loss='categorical_crossentropy',
                      optimizer=self.optimizer, metrics=['accuracy'])

        history = model.fit_generator(train_generator,
                                      steps_per_epoch=120000 / 128,
                                      epochs=self.epochNumber,
                                      validation_data=validation_generator,
                                      validation_steps=15000 / 128,
                                      verbose=1)
        model.summary()
        # model.save(modelName)

        model_json = model.to_json()
        with open("model_json.json", "w") as json_file:
            json_file.write(model_json)
        model.save_weights(modelName)
        return history

    def showChart(self, history):
        acc = history.history['acc']
        val_acc = history.history['val_acc']
        loss = history.history['loss']
        val_loss = history.history['val_loss']

        epochs = range(len(acc))

        plt.plot(epochs, acc, 'r', label='Training accuracy')
        plt.plot(epochs, val_acc, 'b', label='Validation accuracy')
        plt.title('Training and validation accuracy')
        plt.legend(loc=0)
        plt.figure()

        plt.show()
