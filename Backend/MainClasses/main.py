from modelMaking import ModelMaking


def main():
    modelName='EquationModel6.h5'

    modelClass = ModelMaking()
    modelClass.kernel_size=(2,2)
    modelClass.first_convolutional_layer = 256
    modelClass.second_convolutional_layer = 128
    modelClass.hiddenLayer = 512
    modelClass.maxPooling = (2, 2)
    modelClass.dropout = 0.3
    modelClass.epochNumber = 5
    modelClass.optimizer='rmsprop'


    train_generator, validation_generator = modelClass.trainTestGenerator()
    model=modelClass.modelConfiguration()
    history=modelClass.compileModel(model,train_generator,validation_generator,modelName)
    modelClass.showChart(history)
if __name__ == '__main__':
    main()
