# SummariseMe : AI-Powered Summarization for Text, PDFs and Video Content

## About This?
This is a Summarization AI tool which could generate summaries of Long Text , any youtube video (with transcripts) or any pdf. We are presenting this tool for the "deepsolv genai challenge" Hackathon.

## Features:
1. It can summarise Podcast or any youtube videos {with captions} with great efficiency, Also could handel a video with different langauge of caption and auto translate it in `en`.
2. It can summarise Specific chapter or pages of a Long Book efficiently.
3. It can summarise Longer Text from anywhere easily.

## Steps To Run
1. Clone the git repository locally using `git clone https://github.com/PRATHAMU200/SummariseMe.git` run from within the folder you want to store the project in.
  ```
      git clone https://github.com/PRATHAMU200/SummariseMe.git
  ```
2. Create virtual environment: 
	- you can use `virtualenv` I had given a `requirements.txt` file also
  ```
      python3 -m pip install virtualenv
      python3 -m venv venv
      venv\Scripts\activate
      python3 -m pip install -r requirements.txt
  ```
3. Now run app.py from the terminal using this command.
  ```
      python3 app.py
  ``` 
4. You can now visit the website by visiting `http://127.0.0.1:5000` or `http://127.0.0.1:5000` or whatever ports are defined.
5. For using this select `Facebook-Bart` as model and select `Youtube Link` or `Long Text` or `PDF`. Fill respective given fields, Click on `Generate Summary`.
6. Waiting time purely depends upon the computer specification and size of data given to summarize so please have patience while running it.
   
	At First time it will take some time to download `Facebook-bart-large-cnn` model so please wait for it to download. After that you could certainly use it anytime easily.
   	Also if you want to add your summarisation model you could make changes in the main.py file and change the model. 

## General Notes / Suggestions / Problem you may face.
- Go to `main.py` to change the model. We are using `facebook/bart-large-cnn` but you can change to any other model. 
- All subs are stored in the project file `temp/subtitle.txt` and `temp/pdftext.txt`, Please don't delete them.
- Remember to use python3.11 as tensorflow is not awailable in python3.12 we have checked and it didn't work.
- If you found any other issue you could directly tell us in issue section.


## Improvement opportunities
- Currently it will not show all the summary at runtime it only show them together at last after running it because of which user need to wait alot. Although it could be improved by using technologies like socket.io.
- Currently the requirement of youtube video summary is to have caption in the youtube video although it can auto-translate the captions very well.
- It might run little slow and you need to wait, beacause the Processing power of this tool purely depend upon your computer specification.
