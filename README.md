# SummariseMe : AI-Powered Multimodal Summarization for Text and Video Content

## About This?
This is a Summarization AI tool which could generate summaries of Long Text or any youtube video or any pdf. We are presenting this tool for the "deepsolv genai challenge" Hackathon.

## Steps To Run
1. Clone the git repository locally using `git clone https://github.com/PRATHAMU200/SummaryMe.git` run from within the folder you want to store the project in.
  ```
      git clone https://github.com/PRATHAMU200/SummaryMe.git
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
5. For using this select `Facebook-Bart` as model and select `Youtube Link` or `Long Text` only as PDF is not working right now. Fill respective given fields, Click on `Generate Summary`.
   
	At First time it will take some time to download `Facebook-bart-large-cnn` model so please wait for it to download. After that you could certainly use it  

## General Notes 
- Go to `main.py` to change the model. We are using `facebook/bart-large-cnn` but you can change to any other model. 
- All subs are stored in the project file `subtitle.txt`.


## Improvement opportunities
- Currently it will not show all the summary at runtime it only show them together at last after running it because of which user need to wait alot.
- Currently the requirement of youtube video summary is to have caption in the youtube video.
- Summarising a pdf is a longer task  still under development.

