var RecordsDAO = require('../records').RecordsDAO;

/* The ContentHandler must be constructed with a connected db */
function ContentHandler (db) {
    "use strict";

    var records = new RecordsDAO(db);

    this.displayRecords = function(req, res, next) {
        "use strict";

        records.getRecords(1000, function(err, records) {
            "use strict";

            if (err) return next(err);
            
            // array of tags that are used futher in the template as headerline of the table
            var tags = ["session_id","started_by","created_at","summary_status","duration","worker_time","bundle_time","num_workers","branch","commit_id","started_tests_count","passed_tests_count","failed_tests_count","pending_tests_count","skipped_tests_count","error_tests_count"];
            return res.render('records_template', {
                "tags"     : tags,
                "records"  : records
            });
        });
    };

    this.displayTaskOne = function(req, res, next) {
        "use strict";

        return res.render('task_one_template', {

        });
    }

    this.returnDataTaskOne = function(req, res, next) {
      "use strict";

        records.getDataTaskOne(function(err, records) {
          if (err) return next(err);

          var result = [["date", "passed", "failed", "error", "stopped"]],
              obj = {},
              _status = "",
              arr = [];
          
          records.forEach(function(doc) {
            obj = {};
            obj.date = doc._id;
            obj.passed = 0, obj.failed = 0, obj.error = 0, obj.stopped = 0;
            _status = doc.status;
            arr = [];
            
            for (var e in _status) {
              obj[_status[e]["status"]] = _status[e]["count"];
            }
            arr = [obj.date, obj.passed, obj.failed, obj.error, obj.stopped];
            result.push(arr);
          });
          // respond with data in csv format
          res.csv(result);
        });    
    }

    this.returnDataTaskTwo = function(req, res, next) {
      "use strict";

      records.getDataTaskTwo(function(err, records) {
        if (err) return next(err);

        var result = [["time", "build_time"]], arr = [];

        records.forEach(function(doc) {
          arr = [doc.time, doc.build_time];
          result.push(arr);
        });
        // respond with data in csv format
        res.csv(result);
      });
      
    }

    this.displayTaskTwo = function(req, res, next) {
      "use strict";

      return res.render('task_two_template', {

      });
    }
}

module.exports = ContentHandler;
