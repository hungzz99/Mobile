var productHandler={
    addProduct: function(RestaurantName, ReporterName, AveragePrice, RestaurantType, ServiceRating, CleanLinessRating, FoodRating, Date, Note){
        databaseHandler.db.transaction(
            function(tx){
                tx.executeSql(
                    "insert into iFeedback(RestaurantName, ReporterName, AveragePrice, RestaurantType, ServiceRating, CleanLinessRating, FoodRating, Date  , Note) values(?, ?, ?, ?, ?, ?, ?, ?, ?)",
                    [RestaurantName, ReporterName, AveragePrice,
                    RestaurantType, ServiceRating, CleanLinessRating,
                    FoodRating, Date, Note],
                    function(tx, results){},
                    function(tx, error){
                        console.log("add product error: " + error.message);
                    }
                );
            },
            function(error){},
            function(){}
        );
    },
    loadProducts: function(displayProducts){
        databaseHandler.db.readTransaction(
            function(tx){
                tx.executeSql(
                    "select * from iFeedback order by Id desc",
                    [],
                    function(tx, results){
                        //Do the display
                        displayProducts(results);
                    },
                    function(tx, error){//TODO: Alert the message to user
                        console.log("Error while selecting the iFeedbaks" + error.message);
                    }
                );
            }
        );
    },
    deleteProduct:function(Id){
        databaseHandler.db.transaction(
            function(tx){
                tx.executeSql(
                    "delete from iFeedback where Id = ?",
                    [Id],
                    function(tx, results){},
                    function(tx, error){//TODO: Could make an alert for this one.
                        console.log("Error happen when deleting: " + error.message);
                    }
                );
            }
        );
    },
    updateProduct: function(Id, newRestaurantName, newReporterName, newAveragePrice, newRestaurantType, newServiceRating, newCleanLinessRating, newFoodRating, newDate, newNote){
        databaseHandler.db.transaction(
            function(tx){
                tx.executeSql(
                    "update iFeedback set RestaurantName=?, ReporterName=?, AveragePrice=?, RestaurantType=?, ServiceRating=?, CleanlinessRating=?, FoodRating=?, Date=?, Note=? where Id = ?",
                    [newRestaurantName, newReporterName, newAveragePrice, newRestaurantType, newServiceRating, newCleanLinessRating, newFoodRating, newDate, newNote, Id],
                    function(tx, result){},
                    function(tx, error){//TODO: alert/display this message to user
                        console.log("Error updating product" + error.message);
                    }
                );
            }
        );
    }
};