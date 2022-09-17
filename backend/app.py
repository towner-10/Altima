#!/usr/bin/python3
from tkinter import Y
from flask import Flask, request
from flask_cors import CORS


app = Flask(__name__)
CORS(app)

# Default route
@app.route('/', methods=['GET'])
def homeRoute():
    return {
        'status': 200,
        'message': 'Server is running'
    }

"""
Example json object request:
{
  "x_coord": "2.44",
  "y-coord": "3.55",
  "elevation": "4"
}

"""

@app.route('/bestEnergy', methods=['POST'])
def bestEnergy():
    request_data = request.get_json()

    x = request_data['x_coord']
    y = request_data['y_coord']
    elevation = request_data['elevation']

    #call relevent functions

    #convert python dictionary to json
    rankingJson = json.dump(ranking)

    #returns a json object of best 
    return rankingJson

    
def compareSources():
    #compare prices of all energy sources

    #create ordered dictionary based on lowest prices
    #structure would be for example be Solar: 0.4 kilo-watt-hours


    #return the dictionary 
    

def solarPrice
    #return the price 

def hydroPrice

def windPrice


# returns the ranked list of energy
#--------------------

# Saving the request to the database

# Calculating energy sources at this location

# Saving the request details 