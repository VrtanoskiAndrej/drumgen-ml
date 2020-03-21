FROM tensorflow/serving:latest

RUN mkdir serving

COPY ./models/tmp /serving/model
COPY ./config/model.config /serving/model.config

EXPOSE 8500
EXPOSE 8501

ENTRYPOINT ["tensorflow_model_server", "--model_config_file=/serving/model.config", "--port=8500", "--rest_api_port=8501"]
