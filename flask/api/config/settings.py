class BaseConfig:
    """Base configuration"""
    DEBUG = True
    TENSORFLOW_MODEL_URI = 'http://localhost:8501/v1/models/generator:predict'
    SQLALCHEMY_DATABASE_URI = 'sqlite:///static/db/test.db'
    SQLALCHEMY_TRACK_MODIFICATIONS = True


class DevelopmentConfig(BaseConfig):
    """Development configuration"""
    pass


class TestingConfig(BaseConfig):
    """Testing configuration"""
    TESTING = True


class ProductionConfig(BaseConfig):
    """Production configuration"""
    pass
