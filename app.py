from flask import Flask, render_template, request, jsonify
from main import extractpdftext, generate_summary
app = Flask(__name__)

@app.route('/', methods=['POST', 'GET'])
def main():
    return render_template("index.html")

@app.route('/summary',methods=['POST'])
def summary():
    try:
        data = request.form
        input_data = data.get('inputText')
        selectedOption = data.get('selectedOption')
        model = data.get('selectedModel')
        from_page = data.get('from')
        till_page = data.get('till')
        uploaded_file = request.files.get('file')
        if(selectedOption=='pdf'):
            if uploaded_file:
                filepath = f'temp/{uploaded_file.filename}'
                uploaded_file.save(filepath)
                
                print(f"File recived {input_data} , {uploaded_file.filename}, {uploaded_file}")
                extractpdftext(filepath,int(from_page),int(till_page))
                summary = generate_summary(selectedOption, input_data , model)
                return jsonify({'result': summary})
            else:
                return jsonify({'result': "File Not found or file invalid"})
        #result = f"You submitted: {input_data} and {selectedOption}"
        #yield "answer is coming"
        summary = generate_summary(selectedOption, input_data , model)
        return jsonify({'result': summary})
    except Exception as e:
        return jsonify({'result': "error: "+str(e)})
    


if __name__ == '__main__':
    app.run(debug=True)
