#!/usr/bin/python3
from flask import Flask, request
from flask_cors import CORS
import requests
import datetime

app = Flask(__name__)
CORS(app)

# Fetch weather data from API
def fetchData(lng, lat):
    date = datetime.datetime.now() - datetime.timedelta(days=7)
    yearAgo = date - datetime.timedelta(days=365)

    r = requests.get(f'https://archive-api.open-meteo.com/v1/era5?latitude={lat}&longitude={lng}&start_date={yearAgo.strftime("%Y-%m-%d")}&end_date={date.strftime("%Y-%m-%d")}&daily=temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,sunrise,sunset,precipitation_sum,rain_sum,snowfall_sum,precipitation_hours,windspeed_10m_max,windgusts_10m_max,winddirection_10m_dominant&timezone=auto')
    json = r.json()

    print(json)

    # Number of datapoints being fetched
    datapoints = len(json['daily']['time'])

    # Print average max and min temp
    print(sum(json['daily']['temperature_2m_min'])/datapoints)
    print(sum(json['daily']['temperature_2m_max'])/datapoints)

# Latitude 43.466667
# Longitude -80.516670
# Test query: http://localhost:5000/test?lng=-80.516670&lat=43.466667
@app.route('/test', methods=['GET'])
def test():
    lng = request.args.get('lng')
    lat = request.args.get('lat')

    fetchData(lng, lat)

    return {
        'status': 200,
        'message': "Check console for output rn"
    }

# Calculate the best source
@app.route('/location', methods=['GET'])
def location():
    return {
        'status': 501,
        'message': 'Not implemented'
    }

# Default route
@app.route('/', methods=['GET'])
def homeRoute():
    return {
        'status': 200,
        'message': 'Server is running'
    }

if __name__ == "__main__":
    fetchData()