from flask import Flask, render_template, request, jsonify
from main import generate_summary
app = Flask(__name__)

@app.route('/', methods=['POST', 'GET'])
def main():
    if request.method == 'POST':
        query = request.form['sourceType']
        model = 'bart'
        print(query,model)
        if query in ['youtube', 'text']:
            text = request.form['text']
            try:
                # Generate the summary based on the source type and input text
                summary = generate_summary(query, text, model)

                # Return the summary as a JSON response
                return render_template("index.html",summary=summary)
            except Exception as e:
                # Handle errors gracefully
                return jsonify({'error': str(e)}), 500
        elif query == 'pdf':
            text = None

    return render_template("index.html")

@app.route('/summary',methods=['POST'])
def summary():
    try:
        # Get the data from the POST request
        data = request.get_json()
        # Process the data (you can do any processing you need here)
        input_data = data.get('inputText')
        selectedOption = data.get('selectedOption')
        model = data.get('selectedModel')
        #result = f"You submitted: {input_data} and {selectedOption}"
        summary = generate_summary(selectedOption, input_data , model)
        return jsonify({'result': summary})
    except Exception as e:
        return jsonify({'error': str(e)})
    


if __name__ == '__main__':
    app.run(debug=True)
