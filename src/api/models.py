from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(128), nullable=False)
    first_name = db.Column(db.String(50), nullable=True)
    last_name = db.Column(db.String(50), nullable=True)
    favorites = db.Column(db.Integer, default=0)  # Ejemplo de campo favoritos
    favorite_characters = db.relationship('FavoriteCharacter', back_populates='user', cascade="all, delete-orphan")

    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        return {
            'id': self.id,
            'email': self.email,
            'first_name': self.first_name,
            'last_name': self.last_name,
            'favorites': self.favorites,
            'favorite_characters': [fc.serialize() for fc in self.favorite_characters]
        }

class FavoriteCharacter(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    character_id = db.Column(db.Integer, nullable=False)
    name = db.Column(db.String(255), nullable=False)
    image = db.Column(db.String(255), nullable=True)
    user = db.relationship('User', back_populates='favorite_characters')

    def __repr__(self):
        return f'<FavoriteCharacter user_id={self.user_id} character_id={self.character_id}>'

    def serialize(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'character_id': self.character_id,
            'name':self.name,
            'image':self.image
        }
