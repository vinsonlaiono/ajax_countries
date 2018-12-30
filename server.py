from flask import Flask, render_template, request, jsonify

from db import connectToMySQL
app = Flask(__name__)

# Routes
@app.route('/')
def root():
    return render_template('index.html')

# AJAX route query to db for search
@app.route('/search', methods=['POST'])
def search():
    mysql = connectToMySQL('world')
    # query = "SELECT * FROM countries WHERE name LIKE %%(name)s;"
    query = "SELECT * ,LOCATE(%(name)s,name) FROM countries WHERE locate(%(name)s,name)>0 LIMIT 0,10;"
    data = {'name': request.form['search']}
    countries = mysql.query_db(query, data) 
    print(countries)
    return jsonify(countries=countries)

@app.route('/filter/<char>', methods=['POST'])
def filter(char):
    print("*"*80)
    mysql = connectToMySQL('world')
    query = "SELECT * FROM countries WHERE name LIKE %%(name)s ORDER BY name "+char
    data = {'name': request.form['search']+"%"}
    countries = mysql.query_db(query, data)
    return jsonify(countries=countries)

@app.route('/cities', methods=['POST'])
def city():
    mysql = connectToMySQL('world')
    query = "SELECT * ,LOCATE(%(name)s,name) FROM cities WHERE locate(%(name)s,name)>0 LIMIT 0,10;"

    # query = "SELECT * FROM cities;"
    data = {'name': request.form['search']}
    cities = mysql.query_db(query, data)
    print(cities,"*"*80)
    return jsonify(cities=cities)

@app.route('/paginate', methods=['GET'])
def pagintate():

    return jsonify(page=page)

# run app
app.run(debug=True)