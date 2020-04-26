from flask import Flask, render_template, request, redirect, url_for, flash, jsonify
from flask_cors import CORS
from db import db
from models.data import Data

app = Flask( __name__ )

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///data.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = '8221d4c510b33c825c19d78bbf276ed1'
CORS(app)

@app.route('/')
def Index():
  all_data = Data.search_all()
  return render_template( 'index.html', dados = all_data )

@app.route('/get', methods=['GET'])
def getData():
  try:
    all_data = Data.search_all()
  except:
    return jsonify({'mensagem': 'Ocorreu um erro interno'}), 500

  list_dict = []
  for content in all_data:
    list_dict.append(content.toDict())

  return {'dados': list_dict}, 200


# routes to CRUD data
@app.route('/insert', methods = ['POST'])
def insert():

  if request.method == 'POST':

    nome = request.json['nome']
    endereco = request.json['endereco']
    telefone = request.json['telefone']
    data = request.json['data']
    status = request.json['status']

    try:
      user = Data( nome, endereco, telefone, data, status )
      user.save()

      return jsonify( {'ok': True} ) 
    except:
      return jsonify({'mensagem': 'Ocorreu um erro interno'}), 500

    # return redirect( url_for( 'Index' ) )

@app.route( '/update/<id>', methods = ['GET', 'POST'] )
def update( id ):

  if request.method == 'POST':
    try:
      my_data = Data.query.get( id )

      my_data.nome = request.json['nome']
      my_data.endereco = request.json['endereco']
      my_data.telefone = request.json['telefone']
      my_data.data = request.json['data']
      my_data.status = request.json['status']

      db.session.commit()
      return jsonify( {'ok': True} ) 
    except:
      return jsonify({'mensagem': 'Ocorreu um erro interno'}), 500



@app.route( '/delete/<id>', methods = ['GET', 'DELETE'] )
def delete( id ):
  try:
    my_data = Data.query.get( id )
    my_data.delete()
    return redirect( 'http://localhost:3000' )
  except:
    return jsonify({'mensagem': 'Ocorreu um erro interno'}), 500


@app.before_first_request
def create_Tables():
  db.create_all()

if __name__ == '__main__':
  db.init_app(app)
  app.run( debug=True )