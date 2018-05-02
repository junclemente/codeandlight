
# A very simple Flask Hello World app for you to get started with...

from flask import Flask

app = Flask(__name__)

@app.route('/')
def hello_world():
    return 'Hello from Jun @ www.codeandlight.com!<br><p>Site coming soon...</p>'


if __name__ == "__main__":
    app.run(debug=True,
            host='0.0.0.0', port=8080)