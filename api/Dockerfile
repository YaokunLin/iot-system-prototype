FROM python:3.10

WORKDIR /

COPY ./api/requirements.txt /requirements.txt

RUN pip install --no-cache-dir --upgrade -r /requirements.txt

# conditional copying of .env to bypass needing 2 Dockerfiles right now
COPY ./api/main.py ./api/utils.py ./api/mail_services.py ./api/google_routes_services.py ./api/.en[v] ./api/google_sheets_sa_key.jso[n] /

EXPOSE 8080
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8080"]

# If running behind a proxy like Nginx or Traefik add --proxy-headers
# CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "80", "--proxy-headers"]
