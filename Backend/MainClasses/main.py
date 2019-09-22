# from modelMaking import ModelMaking
from imageProcessing import ImageConversions
from segmentation import Symbol, startSegmentation

# later it will be used as rest api or not at all
imagePath = '../Equations/equ2.jpg'
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


def process(imageofequation):

    blackAndWhite = imgConversions.convertOnlyto255and0(imageofequation)
    eroded = imgConversions.erode(blackAndWhite)
    textWhite = imgConversions.makeTextWhite(eroded)
    return textWhite


def segment(preprocessedImage):
    symbols = startSegmentation(preprocessedImage)
    return symbols


def predict(preprocessedImage, symbols):
    # crop=imgConversions.cropImage(preprocessedImage,75,106,1021,1137)
    # imgConversions.plotImageUsingCV(crop)
    symbols.sort(key=lambda x: x.position, reverse=False)
    for i in range(len(symbols)):

        crop = imgConversions.cropImage(preprocessedImage, symbols[i].y, (
            symbols[i].y+symbols[i].height), symbols[i].x, (symbols[i].x+symbols[i].width))

        imgConversions.plotImageUsingCV(crop)

        # print(i.info())


def reconstruct():
    pass


def main():  # the rest api will send a image until then work with a single path image object

    imageObject = imgConversions.openImageUsingCV(imagePath)
    if imageObject is not None:
        print('Image object detected')
        preprocessedImage = process(imageObject)
        symbols = segment(preprocessedImage)
        predict(preprocessedImage, symbols)


if __name__ == '__main__':
    main()
