import sys

dictionary = open(sys.argv[1])

res = []

for item in dictionary:
    
    Fileformat = len(item.split('\t'))
    if Fileformat == 3:
        word,  translation, transcription = item.strip().split('\t')
        res.append({"word": word.strip(), "transcription": transcription.strip(), "translation": translation.strip()})
    elif Fileformat == 2: 
            word,  translation = item.strip().split('\t')
            res.append({"word": word.strip(), "transcription": '', "translation": translation.strip()})

filename = sys.argv[1] + '_words.js'
print(filename)
print ("const words = ", res, file=open(filename, "w"))

    