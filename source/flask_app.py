# A very simple Flask Hello World app for you to get started with...

from flask import Flask
from flask import render_template

app = Flask(__name__)

@app.route('/hello_world')
def hello_world():
    return 'Hello from Jun @ www.codeandlight.com!<br><p>Site coming soon...</p>'


@app.route('/')
@app.route('/index')
def index():
    projects = [
        {
        "title": "GS Communication Website",
        "url": "http://www.gs-communication.com/",
        "code": "https://github.com/junclemente/flask_gscom",
        "image": "gscom.jpeg",
        "desc": "Bacon ipsum dolor amet ground round doner venison jerky shankle beef ribs. Landjaeger shoulder biltong t-bone pork belly pastrami. Kielbasa andouille pork belly, boudin meatloaf frankfurter jerky kevin t-bone filet mignon. Biltong picanha jerky landjaeger. Buffalo filet mignon beef meatball beef ribs boudin."
        },
        {
        "title": "Peptide Sequence Conversion Tool",
        "url": "",
        "code": "https://github.com/junclemente/peptools",
        "image": "peptidetool.jpg",
        "desc": "Bacon ipsum dolor amet ground round doner venison jerky shankle beef ribs. Landjaeger shoulder biltong t-bone pork belly pastrami. Kielbasa andouille pork belly, boudin meatloaf frankfurter jerky kevin t-bone filet mignon. Biltong picanha jerky landjaeger. Buffalo filet mignon beef meatball beef ribs boudin."

        },
        {
        "title": "Wedding Website",
        "url": "",
        "code": "https://github.com/junclemente/mgsite",
        "image": "mgsite.jpg",
        "desc": "Bacon ipsum dolor amet ground round doner venison jerky shankle beef ribs. Landjaeger shoulder biltong t-bone pork belly pastrami. Kielbasa andouille pork belly, boudin meatloaf frankfurter jerky kevin t-bone filet mignon. Biltong picanha jerky landjaeger. Buffalo filet mignon beef meatball beef ribs boudin."
        }
        # { title: "",
        # website: "",
        # code: "",
        # image: ""
        # },
        # { title: "",
        # website: "",
        # code: "",
        # image: ""
        # },
        # { title: "",
        # website: "",
        # code: "",
        # image: ""
        # },
    ]
    return render_template('index.html', projects=projects)


if __name__ == "__main__":
    app.run(debug=True,
            host='0.0.0.0', port=8080)