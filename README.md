BACKEND

Run a virtual environment first venv then install everything in the requirements for backend.
First time only:

python -m venv venv 

source venv/Scripts/activate  # in Git Bash

pip install -r requirements.txt

Afterward:

source venv/Scripts/activate

python -m uvicorn main:app --reload

FRONTEND

Needs to setup nodejs and npm

npm install

npm run dev


Attributes:
<a href="https://www.flaticon.com/free-icons/math" title="math icons">Math icons created by Freepik - Flaticon</a>
<a href="https://www.flaticon.com/free-icons/close" title="close icons">Close icons created by Darius Dan - Flaticon</a>
<a href="https://www.flaticon.com/free-icons/plus" title="plus icons">Plus icons created by dmitri13 - Flaticon</a>