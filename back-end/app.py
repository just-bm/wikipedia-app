
from flask import Flask, request, jsonify
from flask_cors import CORS
import wikipedia

app = Flask(__name__)
CORS(app)

@app.route("/search", methods=["GET"])
def search_wiki():
    query = request.args.get("q", "")
    if not query:
        return jsonify({"error": "Missing search query"}), 400
    
    wikipedia.set_lang("en")
    results = wikipedia.search(query, results = 5)
    output = []
    print(results)
    for title in results:
        try:
            summary = wikipedia.summary(title, sentences = 2)
            output.append({"title": title, "summary": summary, "url": wikipedia.page(title).url})
        except wikipedia.exceptions.DisambiguationError as e:
            output.append({"title": title, "summary": "Disambiguation Error"})
        except wikipedia.exceptions.PageError as e:
            output.append({"title": title, "summary": "Page Error"})
    
    return jsonify(output)



if __name__ == "__main__":
    app.run(debug=True)
