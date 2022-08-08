from ast import arg
import numpy as np
import cv2
from numba import jit,cuda




@jit(target_backend="cuda")
def pixelDiff(l):
    """Pixel difference function.

    Args:
        l (iterable): Iterable object holding two rgb values for different two pixels. [r1,g1,b1,r2,g2,b2] 

    Returns:
        float: RGB space distance for given two pixels. It starts from 0y.
    """
    
    
    return (l[0]-l[3])**2 + (l[1]-l[4])**2 + (l[2]-l[5])**2 


@jit(target_backend = "cuda")
def HSVDiff(h1,h2):
    return min( abs(h1 - h2), 360 - abs(h1 - h2))
    




def imageDiff(img1, img2):
    """Returns the difference average of pixels between two images.

    Args:
        img1 (np.array): Numpy array of the first image.
        img2 (np.array): Numpy array of the second image.

    Returns:
        float: Average of the pixel difference between two images 
    """
    concat = np.concatenate((img1,img2), axis=2)
    
    diffs = []

    for i in range(len(concat)):
        print(i)
        res = list(map(pixelDiff,concat[i]))
        diffs.append(sum(res)/len(res))

    return np.average(diffs)    
    




def loadImage(filepath):
    """Returns the numpy array of the image with given filepath.

    Args:
        filepath (String): Filepath to the image

    Returns:
        numpy.array: Array of shape with (pixelheight,pixelwidth,[r,g,b])
    """
    img = cv2.imread(filepath)

    return img

    




def main():

    images = []
    

    path = "/Users/macbookpro/Downloads/"
    names = ["Solid_white.svg.png","Solid_black.svg.png"]
    

    images.append(loadImage(path + names[0]))
    images.append(loadImage(path + names[1]))
    


    
    diffs = np.array([])

    diffs = np.append(diffs,imageDiff(images[0],images[1]))
        

        
    print(diffs)


    return 0



main()