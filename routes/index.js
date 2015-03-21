var  ContentHandler = require('./content')
   , ErrorHandler = require('./error').errorHandler;

module.exports = exports = function(app, db) {

    var contentHandler = new ContentHandler(db);

    // The main page 
    app.get('/', contentHandler.displayRecords);

    app.get('/records', contentHandler.displayRecords);
    app.get('/task_one', contentHandler.displayTaskOne);
    app.get('/task_two', contentHandler.displayTaskTwo);
    app.get('/data_one.csv', contentHandler.returnDataTaskOne);
    app.get('/data_two.csv', contentHandler.returnDataTaskTwo);

    // Error handling middleware
    app.use(ErrorHandler);
}
