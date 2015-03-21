/* The RecordsDAO must be constructed with a connected database object */
function RecordsDAO(db) {
  "use strict";

  /* If this constructor is called without the "new" operator, "this" points
   * to the global object. Log a warning
  */
  if (false === (this instanceof RecordsDAO)) {
    console.log("Warning: RecordsDAO constructor called without 'new' operator");
    return new RecordsDAO(db);
  }

  var records = db.collection("records");

  this.getRecords = function(num, callback) {
    "use strict";

    records.find().sort('session_id', -1).limit(num).toArray(function(err, items) {
      "use strict";

      if (err) return callback(err, null);

      callback(null, items);
    });
  };

  this.getDataTaskOne = function(callback) {
    "use strict";

    records.aggregate([
      {
        $project: {
          _id : "$_id",
          status : "$summary_status",
          year_month_day: { $dateToString: { format: "%Y-%m-%d", date: "$iso_created_at" } }
        }
      },
      {
        $group : {
          _id : { _id : "$year_month_day", "st" : "$status"},
          "count" : {$sum : 1} 
        }
      },
      {
        $group: {
          _id : "$_id._id",
          status : { $push : { status : "$_id.st", count : "$count"}}
        }
      },
      {
        $sort: {
          _id : 1
        }
      }
    ], function(err, results) {
      if (err) return callback(err, null);

      callback(null, results);
    })
  }

  this.getDataTaskTwo = function(callback) {
    "use strict";

    records.aggregate([ 
      {
        $project: { 
          _id : "$_id",
          time  : { $dateToString : { format : "%Y-%m-%d %H:%M:%S", date : "$iso_created_at" }},
          build_time : "$duration"
        }
      }, 
      {
        $sort : {
          time : 1
        }
      }
    ], function(err, results) {
      if (err) return callback(err, null);

      callback(null, results);
    });
  }
}
module.exports.RecordsDAO = RecordsDAO;
