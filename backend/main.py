#!/usr/bin/python3
from flask import Flask, request
from flask_cors import CORS
import requests
import datetime

from database import Database

app = Flask(__name__)
CORS(app)

database = Database()

# Fetch weather data from API
def fetchData(lng, lat):
    date = datetime.datetime.now() - datetime.timedelta(days=7)
    yearAgo = date - datetime.timedelta(days=365)

    r = requests.get(f'https://archive-api.open-meteo.com/v1/era5?latitude={lat}&longitude={lng}&start_date={yearAgo.strftime("%Y-%m-%d")}&end_date={date.strftime("%Y-%m-%d")}&daily=temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,sunrise,sunset,precipitation_sum,rain_sum,snowfall_sum,precipitation_hours,windspeed_10m_max,windgusts_10m_max,winddirection_10m_dominant&timezone=auto')
    
    if r.ok == False:
        pass
    
    return r.json()

# Calculate temperature score
def calcTemperatureScore(minList, maxList):

    minTemp = minList[0]
    maxTemp = maxList[0]

    for x in minList:
        if x < minTemp:
            minTemp = x

    for x in maxList:
        if x > maxTemp:
            maxTemp = x

    averageTemp = sum(minList + maxList) / len(minList + maxList)

    return 1 - (maxTemp - averageTemp) / (maxTemp - minTemp) * 0.5

# Calculate humidity score
def calcHumidityScore(minTempList, minApparentList, maxTempList, maxApparentList):

    minHumidity = minApparentList[0] - minTempList[0]
    maxHumidity = maxApparentList[0] - maxTempList[0]

    humidityList = []

    for x in range(len(minApparentList)):
        humidityList.append(minApparentList[x] - minTempList[x])
        if (minApparentList[x] - minTempList[x]) < minHumidity:
            minHumidity = minApparentList[x] - minTempList[x]
    
    for x in range(len(maxApparentList)):
        humidityList.append(maxApparentList[x] - maxTempList[x])
        if (maxApparentList[x] - maxTempList[x]) > maxHumidity:
            maxHumidity = maxApparentList[x] - maxTempList[x]

    averageHumidity = sum(humidityList) / len(humidityList)
    
    return 1 - (maxHumidity - averageHumidity) / (maxHumidity - minHumidity) * 0.5

# Calculate wind score
def calcWindScore(speedList, gustList):

    minWind = speedList[0]
    maxWind = gustList[0]

    for x in speedList:
        if x < minWind:
            minWind = x

    for x in gustList:
        if x > maxWind:
            maxWind = x

    averageWind = sum(speedList + gustList) / len(speedList + gustList)

    return (maxWind - averageWind) / (maxWind - minWind) * 0.5 + 0.5

# Latitude 43.466667
# Longitude -80.516670
# Test query: http://localhost:8080/query?lng=-80.516670&lat=43.466667
@app.route('/query', methods=['GET'])
def query():
    lng = request.args.get('lng')
    lat = request.args.get('lat')

    data = fetchData(lng, lat)

    if data == None:
        return {
            'status': 500,
            'message': {
                'tempScore': 0,
                'humidityScore': 0,
                'windScore': 0,
                'solar': 0,
                'turbine': 0,
                'solarKWH': 0,
                'turbineKWH': 0
            }
        }

    tempScore = calcTemperatureScore(data['daily']['temperature_2m_min'], data['daily']['temperature_2m_max'])
    humidityScore = calcHumidityScore(data['daily']['temperature_2m_min'], data['daily']['apparent_temperature_min'], data['daily']['temperature_2m_max'], data['daily']['apparent_temperature_max'])
    windScore = calcWindScore(data['daily']['windspeed_10m_max'], data['daily']['windgusts_10m_max'])
    solarScore = 0.3*(tempScore) + 0.6*(humidityScore) + 0.1*(windScore)
    turbineScore = 0.1*(tempScore) + 0.3*(humidityScore) + 0.6*(windScore)

    return {
        'status': 200,
        'message': {
            'tempScore': tempScore,
            'humidityScore': humidityScore,
            'windScore': windScore,
            'solar': solarScore,
            'turbine': turbineScore,
            # Offset for daylight
            'solarKWH': 3000 / solarScore * 1.55,
            'turbineKWH': 5000 / turbineScore
        }
    }

@app.route('/save', methods=['POST'])
def save():
    user = request.args.get('user')
    lng = request.args.get('lng')
    lat = request.args.get('lat')

    database.postRequest(user, lat, lng)

    return {
        'status': 200,
        'message': 'Sucessfully put user request into database'
    }

@app.route('/get/requests', methods=['GET'])
def getUserRequests():
    user = request.args.get('user')

    res = database.getUserRequests(user)

    return {
        'status': 200,
        'message': res
    }

# Default route
@app.route('/', methods=['GET'])
def homeRoute():
    return {
        'status': 200,
        'message': 'Server is running'
    }