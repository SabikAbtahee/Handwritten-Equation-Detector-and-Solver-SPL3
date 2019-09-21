import numpy as np
import cv2
from PIL import Image
# import PIL as PIL
from matplotlib import pyplot as plt

from imageProcessing import ImageConversions


import os
import sys

# path1 = "../Dataset/Junk/Kaggle/-/" #Source
# path2 = "../Dataset/Junk/Kaggle/+/"

# path3 = "../Dataset/Junk/Kaggle/(/"
# path4 = "../Dataset/Junk/Kaggle/{/"
# path5 = "../Dataset/Junk/Kaggle/)/"
# path6 = "../Dataset/Junk/Kaggle/}/"
# path7 = "../Dataset/Junk/Kaggle/[/"
# path8 = "../Dataset/Junk/Kaggle/]/"

# path9 = "../Dataset/Junk/Kaggle/0/"
# path10 = "../Dataset/Junk/Kaggle/1/"
# path11 = "../Dataset/Junk/Kaggle/2/"
# path12 = "../Dataset/Junk/Kaggle/3/"
# path13 = "../Dataset/Junk/Kaggle/4/"
# path14 = "../Dataset/Junk/Kaggle/5/"
# path15 = "../Dataset/Junk/Kaggle/6/"
# path16 = "../Dataset/Junk/Kaggle/7/"
# path17 = "../Dataset/Junk/Kaggle/8/"
# path18 = "../Dataset/Junk/Kaggle/9/"

# path19 = "../Dataset/Junk/Kaggle/=/"
# path20 = "../Dataset/Junk/Kaggle/div/"
# path21 = "../Dataset/Junk/Kaggle/gt/"
# path22 = "../Dataset/Junk/Kaggle/lt/"
# path23 = "../Dataset/Junk/Kaggle/N/"
# path24 = "../Dataset/Junk/Kaggle/neq/"
# path25 = "../Dataset/Junk/Kaggle/pi/"
# path26 = "../Dataset/Junk/Kaggle/sqrt/"
# path27 = "../Dataset/Junk/Kaggle/times/"
# path28 = "../Dataset/Junk/Kaggle/X/"
# path29 = "../Dataset/Junk/Kaggle/y/"


# newPath=['-','+','(','{',')','}','[',']','0','1','2','3','4','5','6','7','8','9','=','div','gt','lt','N','neq','pi','sqrt','times','x','y']

# paths=[path1,path2,path3,path4,path5,path6,path7,path8,path9,path10,path11,path12,path13,path14,path15,path16,
#        path17,path18,path19,path20,path21,path22,path23,path24,path25,path26,path27,path28,path29]
# paths=[path1]
wid = 28
height = 28

proces = ImageConversions()


def convertToshape(directories):
    index = 0
    for folder in directories:
        index += 1
        dirs = os.listdir(folder)
        y = 0
        for item in dirs:
            y = y+1
            currentimg = folder+item
            img = proces.openImageUsingCV(currentimg)  # open
            # Converted and made text white
            whiteImg = proces.makeTextWhite(img)
            # dilated=proces.dilate(whiteImg) #dilated
            resized = proces.resize(whiteImg, wid, height)  # Resized
            done = proces.expandShape(resized, 2)  # wid*height*1 shaped
            # os.mkdir(newPath[index-1]) # new folder
            imagePath = newPath[index-1]+'/' + \
                y.__str__() + '.png'  # image path
            proces.saveNumpyImage(imagePath, done)  # Saved Image
            # break


# convertToshape(paths)
# os.mkdir(newPath[0])

path1 = "../Dataset/ImageModel/train/-"  # Source
path2 = "../Dataset/ImageModel/train/+"

# path3 = "../DatasImageModel/train/("
# path4 = "../DatasImageModel/train/{"
# path5 = "../DatasImageModel/train/)"
# path6 = "../DatasImageModel/train/}"
# path7 = "../DatasImageModel/train/["
# path8 = "../DatasImageModel/train/]"

path9 = "../Dataset/ImageModel/train/0"
path10 = "../Dataset/ImageModel/train/1"
path11 = "../Dataset/ImageModel/train/2"
path12 = "../Dataset/ImageModel/train/3"
path13 = "../Dataset/ImageModel/train/4"
path14 = "../Dataset/ImageModel/train/5"
path15 = "../Dataset/ImageModel/train/6"
path16 = "../Dataset/ImageModel/train/7"
path17 = "../Dataset/ImageModel/train/8"
path18 = "../Dataset/ImageModel/train/9"

path19 = "../Dataset/ImageModel/train/="
# path20 = "../Dataset/ImageModel/train/div"
# path21 = "../Dataset/ImageModel/train/gt"
# path22 = "../Dataset/ImageModel/train/lt"
# path23 = "../Dataset/ImageModel/train/N"
# path24 = "../Dataset/ImageModel/train/neq"
# path25 = "../Dataset/ImageModel/train/pi"
# path26 = "../Dataset/ImageModel/train/sqrt"
# path27 = "../Dataset/ImageModel/train/times"
path28 = "../Dataset/ImageModel/train/x"
path29 = "../Dataset/ImageModel/train/y"

paths = [path1, path2, path9, path10, path11, path12, path13, path14, path15, path16,
         path17, path18, path19, path28, path29]


def deleteFiles():
    for i in paths:
        for root, dirs, files in os.walk(i):
            count = len(files)
            for fname in files:
                if(count <= 7000):
                    break
                if fname.endswith('.png'):
                    os.remove(os.path.join(root, fname))
                    count -= 1

            print(count)


deleteFiles()
