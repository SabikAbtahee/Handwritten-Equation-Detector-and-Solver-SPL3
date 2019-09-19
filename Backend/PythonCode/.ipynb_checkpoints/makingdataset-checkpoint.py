from ImageProcessing import ImageConversions as convObj

import os, sys
import cv2
import matplotlib.pyplot as plt

path1 = "../Dataset/Junk/Kaggle/-/" #Source
path2 = "../Dataset/Junk/Kaggle/+/"

path3 = "../Dataset/Junk/Kaggle/(/"
path4 = "../Dataset/Junk/Kaggle/{/"
path5 = "../Dataset/Junk/Kaggle/)/"
path6 = "../Dataset/Junk/Kaggle/}/"
path7 = "../Dataset/Junk/Kaggle/[/"
path8 = "../Dataset/Junk/Kaggle/]/"

path9 = "../Dataset/Junk/Kaggle/0/"
path10 = "../Dataset/Junk/Kaggle/1/"
path11 = "../Dataset/Junk/Kaggle/2/"
path12 = "../Dataset/Junk/Kaggle/3/"
path13 = "../Dataset/Junk/Kaggle/4/"
path14 = "../Dataset/Junk/Kaggle/5/"
path15 = "../Dataset/Junk/Kaggle/6/"
path16 = "../Dataset/Junk/Kaggle/7/"
path17 = "../Dataset/Junk/Kaggle/8/"
path18 = "../Dataset/Junk/Kaggle/9/"

path19 = "../Dataset/Junk/Kaggle/=/"
path20 = "../Dataset/Junk/Kaggle/div/"
path21 = "../Dataset/Junk/Kaggle/gt/"
path22 = "../Dataset/Junk/Kaggle/lt/"
path23 = "../Dataset/Junk/Kaggle/N/"
path24 = "../Dataset/Junk/Kaggle/neq/"
path25 = "../Dataset/Junk/Kaggle/pi/"
path26 = "../Dataset/Junk/Kaggle/sqrt/"
path27 = "../Dataset/Junk/Kaggle/times/"
path28 = "../Dataset/Junk/Kaggle/X/"
path29 = "../Dataset/Junk/Kaggle/y/"




newPath=['b-','b+','b(','b{','b)','b}','b[','b]','b0','b1','b2','b3','b4','b5','b6','b7','b8','b9','b=','bdiv','bgt','blt','bN','bneq','bpi','bsqrt','btimes','bX','by']

paths=[path1,path2,path3,path4,path5,path6,path7,path8,path9,path10,path11,path12,path13,path14,path15,path16,
       path17,path18,path19,path20,path21,path22,path23,path24,path25,path26,path27,path28,path29]
wid=28
height=28

proces=convObj()

def convertToshape(directories):
    index=0
    for folder in directories:
        index+=1
        dirs = os.listdir(folder)
        y=0
        for item in dirs:
            y=y+1
            currentimg=folder+item
            img=proces.openImageUsingCV(currentimg) #open
            whiteImg=proces.makeTextWhite(img) #Converted and made text white
            dilated=proces.dilate(whiteImg) #dilated
            resized=proces.resize(dilated,wid,height) #Resized
            done=proces.expandShape(resized,2) # wid*height*1 shaped      
            imagePath=newPath[index-1]+'/'+ y.__str__() + '.png' # image path
            proces.saveNumpyImage(imagePath,done) # Saved Image
            
            



def createFolders(directories):
    index=0
    for folder in directories:
        index+=1
        os.mkdir(newPath[index-1]) # new folder

createFolders(paths)
convertToshape(paths)