
from youtube_transcript_api import YouTubeTranscriptApi
from transformers import pipeline
summarization = pipeline("summarization",model="facebook/bart-large-cnn")

def checkmodel(model):
    if model=='bart':
        return "facebook/bart-large-cnn"
    elif model=='pegasus':
        return "google/pegasus-large"
    else:
        return "facebook/bart-large-cnn"
def generate_summary(source_type, Text,model):
    #summarization = pipeline("summarization",model=checkmodel(model))
    if source_type=='youtube':
        print("extracting youtube caption\n")
        youtubecaption(Text)
        with open('subtitles.txt','r') as f:
            Text = f.read()
        print("done")
    print("Processing")
    summary = ""
    chunk = chunks(Text)
    print(chunk[1])
    for i in range (0,len(chunk[0])):
         #out = summarization(chunk[0][i], min_length = (chunk[1][i]//10), max_length=((chunk[1][i]*4)//10))[0]
         out = summarization(chunk[0][i] , truncation=True)[0]
         summary += out['summary_text']
         print(out['summary_text'])
    return summary
    #num_iters = int(len(Text)/4000)
    # for i in range(0, num_iters + 1):
    #     start = i * 4500
    #     end = (i + 1) * 4500
    #     #print("input text \n" + full_transcript[start:end])
    #     out = summarization(Text[start:end], min_length = 100, max_length=500)[0]
    #     summary += out['summary_text']
    #     print(out['summary_text'])
    #return summary

def youtubecaption(url):
    if ("https://") in url:
        url = url[8:]
    elif("http://") in url:
        url = url[7:]
    if ("?v=") in url:
        l = url.split('v=')
        id = l[1]
    else:
        l = url.split('/')
        id = l[1]
    srt = YouTubeTranscriptApi.get_transcript(id)
    with open("subtitles.txt", "w") as f:
        for i in srt:
            f.write("{} ".format(i['text']))
        

def chunks(s):
    lword = [[], []]
    l , u = 0 , 1
    while((len(s)-l)>20):
        word = 0
        while(word<1000 and u<len(s)):
            if(s[u]==' '):
                word+=1
            u+=1
        lword[0].append(s[l:u])
        lword[1].append(word)
        l = u
    return lword


Text = '''
DC Motor Construction Parts
Chapter One – What is a DC Motor?
A DC motor or direct current motor is an electrical machine that transforms electrical energy into mechanical energy by creating a magnetic field that is powered by direct current. When a DC motor is powered, a magnetic field is created in its stator. The field attracts and repels magnets on the rotor; this causes the rotor to rotate. To keep the rotor continually rotating, the commutator that is attached to brushes connected to the power source supply current to the motors wire windings.
60W Straight DC Motor 24V 3200 RPM
One of the reasons DC motors are preferred over other types of motors is their ability to precision control their speed, which is a necessity for industrial machinery. DC motors are able to immediately start, stop, and reverse—an essential factor for controlling the operation of production equipment.
Chapter Two – Types of DC Motor.
In order to appreciate the benefits of DC motors, it is important to understand the various types. Each type of DC motor has beneficial characteristics that must be examined before purchase and use. Two of the main advantages of DC motors over alternating current (AC) motors are how easy they are to install and that they require little maintenance.
DC motors are differentiated by the connections between the field winding and the armature. The field winding can be connected parallel to the armature or connected in a series. In some cases, the connection is both parallel and in a series.
A further distinction of DC motors is how the rotor is powered; it can be brushed or brushless. In brush DC motors, current is applied to the rotor by brushes. In a brushless DC motor, the rotor has a permanent magnet.
Since DC motors are everywhere and used for a wide variety of applications, there is a different type to meet the needs of every application. Regardless of your need for DC motors, it is important to understand each type since they can be found in every aspect of life.
Brushed DC Motor
'''

