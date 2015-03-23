# Data Viz Programming Exercise

## Files:

session_history.csv   - Build history for a project over the course of several months, includes overall build times and status

Problems:

## 1. Charting app

Implement JS app that reads the session_history.csv file, and uses a JS charting library of your choice to present the following time-series:

   - passing and failing builds per day, stacked-chart
   - build time vs. time, line

## 2. Highlight Outliers

Extend the app from (1) to annotate days in the chart that have an "abnormal" number of failing builds.  Define (and justify) how you are determining "abnormal".

The input file is CSV formatted with one line per build ("session").  For example:

~~~
"session_id","started_by","created_at","summary_status","duration","worker_time","bundle_time","num_workers","branch","commit_id","started_tests_count","passed_tests_count","failed_tests_count","pending_tests_count","skipped_tests_count","error_tests_count"
"951155","wkj@tddium.com","2014-09-10 05:38:55 UTC","passed","605.0","10173.0","189","24","production","a82bfc7a1cf085bd72d99651cac5b6c563846581","0","311","0","3","0","0"
"950998","wkj@tddium.com","2014-09-10 02:07:17 UTC","passed","674.0","11645.0","197","24","production","b4ac608381bb216ff98366009bbee647eae948aa","0","311","0","3","0","0"
"950659","wkj@tddium.com","2014-09-09 23:29:39 UTC","error","0.0","0.0","0","0","production","a662b92fba90e0398a6c47b2db99307c1c60593b","0","0","0","0","0","314"
~~~

The interesting columns are:

    (3) - Build created_at
    (4) - Build final status
    (5) - Build overall duration, in seconds

#Instruction

1. Install MongoDB *(version 3.0.1)* on your computer and run it on the standard port (27017)
You may use this tutorial: http://docs.mongodb.org/manual/tutorial/install-mongodb-on-ubuntu/

2. To restore archive with DB data please use the following command:
**tar -zxvf cybercraft.tar.gz**

3. Ensure that you have mongorestore version 3.0.1 or higher. Use mongorestore to restore the dump into your running mongod. Do this by opening a terminal window (mac) or cmd window (windows) and navigating to the directory so that the dump directory is directly beneath you. 
Now please type:
**mongorestore dump**

**Note you will need to have your path setup correctly to find mongorestore.**

4. Now, using the Mongo shell, perform a findOne on the collection called records in the database cybercraft. Required command are given below. Please ensure that the date returned looks same as below:

**show dbs
use cybercraft
show collections
db.records.findOne()
{
  "_id" : ObjectId("550bf0d63d9214c9126569c8"),
  "session_id" : 951155,
  "started_by" : "wkj@tddium.com",
  "created_at" : "2014-09-10 05:38:55 UTC",
  "summary_status" : "passed",
  "duration" : 605,
  "worker_time" : 10173,
  "bundle_time" : 189,
  "num_workers" : 24,
  "branch" : "production",
  "commit_id" : "a82bfc7a1cf085bd72d99651cac5b6c563846581",
  "started_tests_count" : 0,
  "passed_tests_count" : 311,
  "failed_tests_count" : 0,
  "pending_tests_count" : 3,
  "skipped_tests_count" : 0,
  "error_tests_count" : 0,
  "iso_created_at" : ISODate("2014-09-10T05:38:55Z")
}**
