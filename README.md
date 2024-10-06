# Phishing Simulation

## Important Notice

This application has been created solely for testing and educational purposes to demonstrate how phishing attacks can occur. It is designed to help users understand the risks associated with phishing and to promote awareness about online security.

Please be aware of the following:

- Do Not Enter Personal Information: This app is not intended for any real transactions or personal data entry. Entering sensitive information may expose you to security risks.
- For Learning Only: The content and scenarios within this app are strictly for instructional use. They illustrate how phishing works and should not be replicated in real-world situations.
- Security Awareness: The goal of this demo is to educate users about the importance of recognizing phishing attempts and protecting personal information online.


## How to run - prerequisites, utilities
Make sure you have following utilities installed on your machine:
- make
- docker
- docker-compose

Application was tested against Linux and Windows machines. Most likely, if you are using Linux machine, you should change `docker-compose` to `docker compose` in `./docker/makefile`.

## Run docker containers 

1. Create .env file copies from template files and fill it with your data:

```bash
# for backend
cd ./backend && cp ./.env.template ./.env.prod
# for mongo
cd ./docker && cp ./mongo.env.template ./mongo.env
```

2. Run following commands to run all services:
```bash
cd ./docker
make mongo
make api
make client
```

3. Open `localhost` in your browser.

4. Stop all services:
```bash
cd ./docker
make stop
```