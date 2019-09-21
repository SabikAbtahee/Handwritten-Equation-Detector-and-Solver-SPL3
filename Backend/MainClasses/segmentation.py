import PIL.ImageOps
import numpy as np
import cv2
import glob
import os
import scipy.misc

# from scipy.misc import imageio.imwrite

from PIL import Image, ImageDraw
from imageProcessing import ImageConversions

equal_path = '../Equations/'
equal_result_path = '../Equations/res/'
equal_boxed_path = '../Equations/boxed/'

AllSymbols = []  # Global list of objects for symbols


class Symbol:
    character = ''
    position = -1
    isSquare = False
    isMinus = False
    isVerticalBar = False
    isDot = False
    height = 1
    width = 1
    (centerX, centerY) = (1, 1)
    (x, y) = (1, 1)

    def info(self):

        print('Character ', self.character)
        print('position ', self.position)
        print('isSquare ', self.isSquare)
        print('isMinus ', self.isMinus)
        print('isVerticalBar ', self.isVerticalBar)
        print('isDot ', self.isDot)
        print('height ', self.height)
        print('width ', self.width)
        print('Center x & y ', self.centerX, self.centerY)
        print('x & y ', self.x, self.y)

    def hwRatio(self):
        return self.height/self.width

    def setSquare(self):
        return self.isSquare

    def setMinus(self):  # - in most cases
        if(self.width > 0 and self.height > 0 and (self.width/self.height > 2)):
            self.isMinus = True
        else:
            self.isMinus = False

    def setVerticalBar(self):  # 1 in most cases
        if(self.width > 0 and self.height > 0 and (self.height/self.width > 2)):
            self.isVerticalBar = True
        else:
            self.isVerticalBar = False

    def setDot(self):  # Might change according to test cases
        if(self.width > 0 and self.height > 0 and (self.height*self.width < 400)):
            self.isDot = True
        else:
            self.isDot = False

    def getArea(self):
        return self.height*self.width

    def getXY(self):
        return (self.x, self.y)

    def setCenter(self):
        self.centerX = int(self.x + (self.width/2))
        self.centerY = int(self.y - (self.height/2))

    def getCenter(self):
        return (self.centerX, self.centerY)


def startSegmentation(preprocessedImage):
    contours = getContours(preprocessedImage)
    res = getPositionInformationOfContours(preprocessedImage, contours)
    res.sort()
    makeSymbols(res)
    checkSquare()
    checkEqual()

    return AllSymbols


def checkEqual():
    for i in AllSymbols:
        print(i.info())

def checkSquare():
    for i in AllSymbols:
        print(i.info())


def makeSymbols(results):

    count = 0
    for i in results:
        sym = Symbol()
        sym.position = count
        count += 1
        sym.x = i[0][0]
        sym.y = i[0][1]
        sym.width = i[1][0]-i[0][0]
        sym.height = i[1][1]-i[0][1]
        sym.setCenter()
        sym.setMinus()
        sym.setDot()
        sym.setVerticalBar()
        AllSymbols.append(sym)


def getContours(img):
    contours, hierarchy = cv2.findContours(
        img, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    return contours


def getPositionInformationOfContours(img, contours):
    res = []
    for cnt in contours:
        x, y, w, h = cv2.boundingRect(cnt)

        res.append([(x, y), (x+w, y+h)])
    print(len(contours))
    return res
