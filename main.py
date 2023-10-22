
from youtube_transcript_api import YouTubeTranscriptApi
from transformers import pipeline
import fitz

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
        with open('temp/subtitles.txt','r', encoding="utf-8") as f:
            Text = f.read()
        print("done")
    elif source_type=='pdf':
        with open('temp/pdftext.txt','r' , encoding="utf-8") as f:
            Text = f.read()
        print("done")
    print("Processing")
    summary = ""
    chunk = chunks(Text)
    print(chunk[1])
    for i in range (0,len(chunk[0])):
         #out = summarization(chunk[0][i], min_length = (chunk[1][i]//10), max_length=((chunk[1][i]*4)//10))[0]
         out = summarization(chunk[0][i] , min_length = (chunk[1][i]//15), truncation=True)[0]
         summary += out['summary_text']+"<br /><br />"
         print(out['summary_text'])
    return summary

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

    #extracting and translating transcripts
    try:
        try:
            srt = YouTubeTranscriptApi.get_transcript(id,languages=['en','en-IN'])
        except:
            transcript_list = YouTubeTranscriptApi.list_transcripts(id)
            for transcript in transcript_list:
                if(transcript.is_translatable):
                    srt = (transcript.translate('en').fetch())
                    break
                else:
                    raise Exception("Sorry, Can Not Find a sutaible Transcript or Translation in English.")
    except Exception as e:
        raise Exception("Warning: Not Able to find any Transcript OR not able to translate it, Please only upload a video with transcript.")
    with open("temp/subtitles.txt", "w", encoding="utf-8") as f1:
            for i in srt:
                if(i['text']!="" and i['text']!="\n"):
                    f1.write("{} ".format(i['text']))
        

def chunks(s):
    lword = [[], []]
    l , u = 0 , 1
    while((len(s)-l)>20):
        word = 0
        while(word<1200 and u<len(s)):
            if(s[u]==' '):
                word+=1
            u+=1
        lword[0].append(s[l:u])
        lword[1].append(word)
        l = u
    return lword


def extractpdftext(file,ps,pe):
    whole_text = ""
    with open('temp/pdftext.txt','w' , encoding="utf-8") as f:
        doc = fitz.open(file)
        for i in range(ps-1,pe):
            page = doc.load_page(i)
            data = page.get_text("text")
            f.write(data)
            f.write('\n')
    print("done")

# id = "rH8yPFq0Xpo"
# srt = ""
#srt = YouTubeTranscriptApi.get_transcript(id,languages=['en'])
# try:
#     try:
#         srt = YouTubeTranscriptApi.get_transcript(id,languages=['en'])
#     except:
#         transcript_list = YouTubeTranscriptApi.list_transcripts(id)
#         for transcript in transcript_list:
#             if(transcript.is_translatable):
#                 srt = (transcript.translate('en').fetch())
#                 break
#             else:
#                 raise Exception("Sorry, Can Not Find a sutaible Transcript or Translation in English.")
# except Exception as e:
#     raise ("Warning: Could not find any Transcript oe couldn't able to translate it, Please only upload a video with transcript.")
# with open("temp/subtitles.txt", "w", encoding="utf-8") as f1:
#         for i in srt:
#             if(i['text']!="" and i['text']!="\n"):
#                 f1.write("{} ".format(i['text']))