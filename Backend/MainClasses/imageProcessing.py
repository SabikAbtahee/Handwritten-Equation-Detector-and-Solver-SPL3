import numpy as np
import cv2
from PIL import Image
from matplotlib import pyplot as plt
# from PIL import *
class ImageConversions:
    def openImageUsingCV(self, path):
        img = cv2.imread(path)
        return img

    def openImageUsingCVGrayScale(self, path):
        img = cv2.imread(path)
        if(self.isImageGrayScale(img) == False):
            img = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
        return img

    def graytobgr(self, img):
        if(self.isImageGrayScale(img) == True):
            img = cv2.cvtColor(img, cv2.COLOR_GRAY2RGB)
        return img

    def saveNumpyImage(self, path, numImg):
        cv2.imwrite(path, numImg)

    def openImageUsingPillow(self, path):
        im = Image.open(path)
        return im

    def savePILImage(self, path, img):
        img.save(path)

    def expandShape(self, numarray, axisNumber):
        a = np.expand_dims(numarray, axis=axisNumber)
        return a

    def plotImageUsingMATPLOTLIB(self, img):
        plt.imshow(img)
        plt.show()

    def plotImageUsingCV(self, img):
        cv2.imshow('Gray image', img)
        cv2.waitKey(0)

    def printInformation(self, obj):
        print(type(obj))
        if isinstance(obj, np.ndarray):
            print('Numpy object ')
            print('Object shape: ', obj.shape)
            print('Object size: ', obj.size)
            print('Object type: ', obj.dtype)
        # elif isinstance(obj, PIL.JpegImagePlugin.JpegImageFile):
        #     print('Pillow object of JPEG file')
        # elif isinstance(obj, PIL.PngImagePlugin.PngImageFile):
        #     print('Pillow object of PNG file')
    
    def pixelInversion0to255(self, img):  # inverts image b - w or w - b
        copyImage = np.copy(img)
        copyImage[img > 175] = 0
        copyImage[img <= 175] = 255
        return copyImage
    
    def isTextWhite(self, img):  # returns true if text white else false
        white = np.sum(img >= 127)
        black = np.sum(img < 127)
        if(white > black):
            return False
        else:
            return True
    
    def bgrtogray(self, img):  # returns grayscale image
        if(self.isImageGrayScale(img)==False):
            img = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
        return img
    
    def convertOnlyto255and0(self, img):  # returns image to 0 and 255 image
        if(self.isImageGrayScale(img) == False):
            grayImage = self.bgrtogray(img)
        else:
            grayImage = img
        (thresh, blackAndWhiteImage) = cv2.threshold(
            grayImage, 127, 255, cv2.THRESH_BINARY)
        return blackAndWhiteImage

    def convertOnlyto255and0WithThresh(self, img,ths):  # returns image to 0 and 255 image
        if(self.isImageGrayScale(img) == False):
            grayImage = self.bgrtogray(img)
        else:
            grayImage = img
        (thresh, blackAndWhiteImage) = cv2.threshold(
            grayImage, ths, 255, cv2.THRESH_BINARY)
        return blackAndWhiteImage
    
    def makeTextWhite(self, img): # makes the text white for contour detection
        bwImg = self.convertOnlyto255and0(img)
        if(self.isTextWhite(bwImg) == False):
            whiteTextImage = self.pixelInversion0to255(bwImg)
        else:
            whiteTextImage = bwImg
        inv = self.expandShape(whiteTextImage, 2)
        return inv
    
    def dilate(self, img):  #Makes the text thicker
        kernel = np.ones((5, 5), np.uint8)
        # erosion = cv2.erode(img,kernel,iterations = 1)
        opening = cv2.morphologyEx(img, cv2.MORPH_OPEN, kernel)
        dilation = cv2.dilate(img, kernel, iterations=1)
        return dilation
    
    def erode(self, img): # makes the text thinner
        kernel = np.ones((5, 5), np.uint8)
        opening = cv2.morphologyEx(img, cv2.MORPH_OPEN, kernel)
        erosion = cv2.erode(img, kernel, iterations=1)
        return erosion
    
    def erodewithParam(self, img,k1,k2,iter): # makes the text thinner
        kernel = np.ones((k1, k2), np.uint8)
        opening = cv2.morphologyEx(img, cv2.MORPH_OPEN, kernel)
        erosion = cv2.erode(img, kernel, iterations=iter)
        return erosion
    
    def resize(self, img, width, height):
        dim = (width, height)
        if(img.shape[0]<height or img.shape[1]<width):
            resized = cv2.resize(img, dim, interpolation=cv2.INTER_CUBIC)
        else:
            resized = cv2.resize(img, dim, interpolation=cv2.INTER_AREA)
        return resized
    
    def isImageGrayScale(self, img):
        if(len(img.shape) < 3):
            return True
        elif(len(img.shape) == 3):
            if(img.shape[2]!=3):
                return True
            return False
    
    def cropImage(self,img,ystart,yend,xstart,xend): # first two is the y axis range counts from top second two is x axis range counts from left
        croppedImage = img[ystart:yend,xstart:xend]
        return croppedImage
    
    def makeBorder(self,img,fixedWidth):
        h=img.shape[0]
        w=img.shape[1]
        if(h>w):
            bordersizelr=int((h-w)/2)+fixedWidth
            bordersizetb=fixedWidth
        else:
            bordersizetb=int((w-h)/2)+fixedWidth
            bordersizelr=fixedWidth
        # bordersize=size
        borderImage = cv2.copyMakeBorder(
            img,
            top=bordersizetb,
            bottom=bordersizetb,
            left=bordersizelr,
            right=bordersizelr,
            borderType=cv2.BORDER_CONSTANT,
            value=[0, 0, 0]
        )
        # self.plotImageUsingCV(border)
        return borderImage