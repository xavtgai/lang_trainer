import sys

dictionary = open(sys.argv[1])

res = []

for item in dictionary:
    
    Fileformat = len(item.split('\t'))
    if Fileformat == 3:
        word, transcription, translation = item.strip().split('\t')
        res.append({"word": word.strip(), "transcription": transcription.strip(), "translation": translation.strip()})


print ("const words = ", res, file=open("words1.js", "w"))

    