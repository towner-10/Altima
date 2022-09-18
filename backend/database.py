from datetime import datetime, timezone
import psycopg2
import os

class Database:
    def __init__(self):
        self.conn = psycopg2.connect(os.environ.get('DATABASE_URL'))

    def postRequest(self, userID, lat, long):
        date = datetime.now(timezone.utc)

        with self.conn.cursor() as cur:
            cur.execute("INSERT INTO requests (userid, timeposted, lat, long) VALUES (%s, %s, %s, %s);", (userID, date, lat, long))
            cur.close()
        
        self.conn.commit()

    def getUserRequests(self, userID):
        res = []
        with self.conn.cursor() as cur:
            cur.execute("SELECT * FROM requests WHERE userid=%s", (str(userID),))
            res = cur.fetchall()
            cur.close()

        self.conn.commit()

        return res
    
    def clearRequestTable(self):
        with self.conn.cursor() as cur:
            cur.execute("DELETE FROM requests;")
            cur.close()
        
        self.conn.commit()