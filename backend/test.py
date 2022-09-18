from urllib import request
import psycopg2
import os

url = 'postgresql://moon:oFvnSKk11YxC_Oeh627BjA@free-tier14.aws-us-east-1.cockroachlabs.cloud:26257/defaultdb?sslmode=verify-full&options=--cluster%3Daltima-5043'
conn = psycopg2.connect(url)
# conn = psycopg2.connect(os.environ['DATABASE_URL'])

'''
#SQL database structure: userID, timePosted, lat, long
with conn.cursor() as cur:
    cur.execute("CREATE TABLE requestList (userID varchar, timePosted date, lat float, long float);")
conn.commit()
'''

# Call this function in the request route
def postRequest(userID, lat, long):
    #date = str(date.today())
    date = str(51122)

    with conn.cursor() as cur:
        cur.execute("""
        INSERT INTO requestList (userID, timePosted, lat, long)
        VALUES (%s, %s, %s, %s);
        """, 
        (userID, date, lat, long))
    conn.commit()
# date literal datetime.date(2005, 11, 18)


def getRequest(userID):
    with conn.cursor() as cur:
        query = cur.execute(""" SELECT * FROM requestList WHERE userid = %s """, userID)
    conn.commit()


    #returns table as json object
    return query

#test first function
userID = 'test'
lat = 448473
long = 394857

postRequest(userID, lat, long)
