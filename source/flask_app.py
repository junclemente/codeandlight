# A very simple Flask Hello World app for you to get started with...

from flask import Flask
from flask import render_template

from my_projects import projects

app = Flask(__name__)

@app.route('/hello_world')
def hello_world():
    return 'Hello from Jun @ www.codeandlight.com!<br><p>Site coming soon...</p>'


@app.route('/')
@app.route('/index')
def index():

    return render_template('index.html', projects=projects)


if __name__ == "__main__":
    app.run(debug=True,
            host='0.0.0.0', port=8080)