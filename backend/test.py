from urllib import request
import psycopg2
import os

url = 'postgresql://moon:FGO0xNTn_cd85kmo2HQADQ@free-tier14.aws-us-east-1.cockroachlabs.cloud:26257/defaultdb?sslmode=verify-full&options=--cluster%3Daltima-5043'
conn = psycopg2.connect(url)
# conn = psycopg2.connect(os.environ['DATABASE_URL'])

#SQL database structure: userID, timePosted, lat, long
""" MAKE TABLE (only once)
with conn.cursor() as cur:
    cur.execute("CREATE TABLE requestList (userID varchar, timePosted date, lat double, long double);")

"""

# Call this function in the request route
def postRequest(userID, lat, long):
    date = str(date.today())

    with conn.cursor() as cur:
        cur.execute("""
        INSERT INTO requestList (a_string, a_date, a_double, a_double)
        VALUES (%s, %s, %d, %d);
        """, 
        (userID, date, lat, long))
    conn.commit()
# date literal datetime.date(2005, 11, 18)


def getRequest(userID):
    with conn.cursor() as cur:
        query = cur.execute(f""" SELECT * FROM requestList WHERE userid = {userID} """)
    conn.commit()


    #returns table as json object


