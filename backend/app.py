#Progression is (more sources)(coachroach)(machine model)
#Good design was to specify output of all our work etc 
#Team need whiteboard obv

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


#Start here

"""
Example of json object front end sends:
{
  "x_coord": "2.44",
  "y-coord": "3.55",
  "elevation": "4"
}

"""

# Calculate the best source
@app.route('/location', methods=['POST'])
def location():
    request_data = request.get_json()

    x = request_data['x_coord']
    y = request_data['y_coord']
    elevation = request_data['elevation']

    #Fetching weather data from API
    


    #call relevent functions & pass said data
    #But what weather or data does the wind calculator need?

    #convert python dictionary to json
    rankingJson = json.dump(ranking)

    #returns a json object of best 
    return rankingJson

 #if calculator functions return json just directly return that
   


"""
Example of json object the /location function returns



"""

#CALCULATOR FUNCTIONS
    
def compareSources():
    #compare prices of all energy sources

    #create ordered dictionary based on lowest prices
    #structure would be for example be Solar: 0.4 kilo-watt-hours


    #return the dictionary 
    
def windSource():



# returns the ranked list of energy
#--------------------
# Calculating energy sources at this location