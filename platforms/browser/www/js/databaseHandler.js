var databaseHandler = {
    db: null,
    createDatabase: function(){
        this.db = window.openDatabase(
            "feedbackrestaurants.db",
            "1.0",
            "feedbackrestaurants database",
            1000000);
        this.db.transaction(
            function(tx){
                //Run sql here using tx
                tx.executeSql('CREATE TABLE IF NOT EXISTS iFeedback ( Id integer primary key, RestaurantName text, '+
                    ' RestaurantType text, ReporterName text, AveragePrice text, ServiceRating text, '+
                    ' CleanLinessRating text, FoodRating text, Date text, Note text) ' ,
                    [],
                    function (tx, results) {},
                    function (tx, error) {
                        console.log("Error while creating the table: " + error.message);
                    }
                );
            },
            function (error) {
                console.log("Transaction error: " + error.message);
            },
            function () {
                console.log("Create DB transaction completed successfully!");
            }
        );
    }
};