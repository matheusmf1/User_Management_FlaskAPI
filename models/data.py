from db import db

class Data(db.Model):
  id = db.Column( db.Integer, primary_key = True )
  nome = db.Column( db.String(45) )
  endereco = db.Column( db.String(60) )
  telefone = db.Column( db.String(30) )
  data = db.Column( db.String(30) )
  status = db.Column( db.String(30) )

  def __init__(self, nome, endereco, telefone, data, status):
    self.nome = nome
    self.endereco = endereco
    self.telefone = telefone
    self.data = data
    self.status = status

  @classmethod
  def search_all(cls):
    return cls.query.all()

  # Add to dataBase
  def save(self):
    db.session.add(self)
    db.session.commit()

  # Remove from dataBase
  def delete(self):
    db.session.delete(self)
    db.session.commit()

  def select_by_ID(self, id ):
    return Data.query.filter_by(id = id).first()
