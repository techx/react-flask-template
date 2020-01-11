from server.app import app
from server.api.v1.api import api
from server.controllers.cron import cron_job
from flask import Flask
from flask_restful import Api
from apscheduler.schedulers.background import BackgroundScheduler
import sys

app.register_blueprint(api.blueprint, url_prefix='/api/v1')

print("Initializing Background Scheduler")
sched = BackgroundScheduler()
sched.add_job(cron_job, trigger='interval', days=1)
sched.start()
cron_job()
