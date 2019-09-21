import numpy as np
import cv2
from PIL import Image
# import PIL as PIL
from matplotlib import pyplot as plt

class ImageConversions:
    def openImageUsingCV(self,path):
        img = cv2.imread(path)
        return img
    def openImageUsingCVGrayScale(self,path):
        img = cv2.imread(path)
        imgray = cv2.cvtColor(img,cv2.COLOR_BGR2GRAY)
        return imgray
    def saveNumpyImage(self,path,numImg):
        cv2.imwrite(path, numImg) 

    def openImageUsingPillow(self,path):
        im = Image.open(path)
        return im

    def savePILImage(self,path,img):
        img.save(path)

    def expandShape(self,numarray,axisNumber):
        a=np.expand_dims(numarray,axis=axisNumber)
        return a 

    def plotImageUsingMATPLOTLIB(self,img):
        plt.imshow(img)
        plt.show()

    def plotImageUsingCV(self,img):
        cv2.imshow('Gray image', img)
        cv2.waitKey(0)

    def printInformation(self,obj):
        print(type(obj))
        if isinstance(obj,np.ndarray):
            print('Numpy object ')
            print('Object shape: ',obj.shape)
            print('Object size: ',obj.size)
            print('Object type: ',obj.dtype)
        elif isinstance(obj,PIL.JpegImagePlugin.JpegImageFile):
            print('Pillow object of JPEG file')
        elif isinstance(obj,PIL.PngImagePlugin.PngImageFile):
            print('Pillow object of PNG file')

    def pixelInversion0to255(self,img): # inverts image b - w or w - b
            copyImage = np.copy(img)
            copyImage[img > 175] = 0
            copyImage[img <= 175] = 255
            return copyImage

    def isTextWhite(self,img): #returns true if text white else false
        white=np.sum(img >= 127)
        black=np.sum(img < 127)
        if(white>black):
            return False
        else:
            return True

    def convertToGrayScale(self,img): #returns grayscale image
        gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
        return gray

    def convertOnlyto255and0(self,img): # returns image to 0 and 255 image
        if(self.isImageGrayScale(img)==False):
            grayImage=self.convertToGrayScale(img)
        else:
            grayImage=img
        (thresh, blackAndWhiteImage) = cv2.threshold(grayImage, 127, 255, cv2.THRESH_BINARY)
        

        return blackAndWhiteImage
    
    def makeTextWhite(self,img):
        bwImg=self.convertOnlyto255and0(img)
        # self.printInformation(bwImg)
        if(self.isTextWhite(bwImg)==False):
            whiteTextImage=self.pixelInversion0to255(bwImg)
        else:
            whiteTextImage = bwImg
        inv=self.expandShape(whiteTextImage,2)
        return inv
    
    def dilate(self,img):
        kernel = np.ones((5,5),np.uint8)
        # erosion = cv2.erode(img,kernel,iterations = 1)
        opening = cv2.morphologyEx(img, cv2.MORPH_OPEN, kernel)
        dilation = cv2.dilate(img,kernel,iterations = 1)
        return dilation
    
    def erode(self,img):
        kernel = np.ones((5,5),np.uint8)
        opening = cv2.morphologyEx(img, cv2.MORPH_OPEN, kernel)
        erosion = cv2.erode(img,kernel,iterations = 1)
#         dilation = cv2.dilate(img,kernel,iterations = 1)
        return erosion

    def resize(self,img,width,height):
        dim=(width,height)
        resized = cv2.resize(img, dim, interpolation = cv2.INTER_AREA)
        return resized

    def isImageGrayScale(self,img):
        if(len(img.shape)<3):
            return True
        elif(len(img.shape)==3):
            return False