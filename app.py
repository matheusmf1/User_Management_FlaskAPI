from flask import Flask, render_template, request, redirect, url_for, flash

from db import db
from models.data import Data

app = Flask( __name__ )
app.secret_key = 'oi'

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///data.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = '8221d4c510b33c825c19d78bbf276ed1'


@app.route('/')
def Index():
  all_data = Data.search_all()
  return render_template( 'index.html', dados = all_data )


# routes to CRUD data
@app.route('/insert', methods = ['POST'])
def insert():

  if request.method == 'POST':

    nome = request.form['nome']
    endereco = request.form['endereco']
    telefone = request.form['telefone']
    data = request.form['data']
    status = request.form['status']

    user = Data( nome, endereco, telefone, data, status)
    user.save()

    flash( 'Usuário adicionado com sucesso!' )

    return redirect( url_for( 'Index' ) )

@app.route( '/update', methods = ['GET', 'POST'] )
def update():

  if request.method == 'POST':
    my_data = Data.query.get( request.form.get('id') )

    my_data.nome = request.form['nome']
    my_data.endereco = request.form['endereco']
    my_data.telefone = request.form['telefone']
    my_data.data = request.form['data']
    my_data.status = request.form['status']

    db.session.commit()
    flash('Usuário atualizado com sucesso!')

    return redirect( url_for( 'Index' ) )


@app.route( '/delete/<id>', methods = ['GET', 'DELETE'] )
def delete( id ):
  my_data = Data.query.get( id )
  my_data.delete()

  flash('Usuário apagado com sucesso!')

  return redirect( url_for( 'Index' ) )

@app.before_first_request
def create_Tables():
  db.create_all()

if __name__ == '__main__':
  db.init_app(app)
  app.run( debug=True )