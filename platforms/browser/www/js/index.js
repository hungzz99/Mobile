$(document).on("ready", function(){
    databaseHandler.createDatabase();
});
function addProduct(){
    var RestaurantName = $("#txtRestaurantName").val();
    var ReporterName = $("#txtReporterName").val();
    var AveragePrice = $("#txtAveragePrice").val();
    var RestaurantType = $("#txtRestaurantType").val();
    var ServiceRating = $("#txtServiceRating").val();
    var CleanlinessRating = $("#txtCleanliness").val();
    var FoodRating = $("#txtFoodRating").val();
    var Date = $("#txtDate").val();
    var Note = $("#txtNote").val();

    if(!RestaurantName || !ReporterName || !AveragePrice){
        alert("Text is required! Pls input!");
    }else{
        var r = confirm("RestaurantName: " + RestaurantName + "\n" + "Reportername: " + ReporterName + "\n" + "AveragePrice:" + AveragePrice +
            "\n" + "RestaurantType:" + RestaurantType + "\n" + "ServiceRating:" + ServiceRating + "\n" + "CleaanRating:" + CleanlinessRating  + "\n" +
            "FooaRating:" + FoodRating + "\n" + "Date:" + Date + "\n" + "Note:" + Note);
        if(r==true){
            productHandler.addProduct(RestaurantName, ReporterName, AveragePrice, RestaurantType, ServiceRating, CleanlinessRating, FoodRating, Date, Note);
            $("#txtRestaurantName").val("");
            $("#txtReporterName").val("");
            $("#txtAveragePrice").val("");
            $("#txtRestaurantType").val("");
            $("#txtServiceRating").val("");
            $("#txtCleanliness").val("");
            $("#txtFoodRating").val("");
            $("#txtDate").val("");
            $("#txtNote").val("");
        }
    }
}
var currentProduct={
Id: -1,
}
function displayProducts(results){
    var length = results.rows.length;
    var lstProducts = $("#lstProducts");
    lstProducts.empty();//Clean the old data before adding.
    for(var i = 0; i< length; i++){
        var item = results.rows.item(i);
        var style = $("<div system\"height: auto; width: 70%; float: left\">");
        var a = $("<a />");
        var h3 = $("<h3 />").text("Restaurant Name: ");
        var h4 = $("<h4 />").text("Reporter Name: ");
        var h5 = $("<h5 />").text("Average Price: ");
        var h5_1 = $("<h5 />").text("Restaurant Type: ");
        var h6 = $("<h6 />").text("Service Rating: ");
        var h6_1 = $("<h6 />").text("CleanLiness Rating: ");
        var h6_2 = $("<h6 />").text("Food Quality Rating: ");
        var p1 = $("<p />").text("Note: ");
        var p2= $("<p />").text("Date: ");
        var p = $("<p />").text("Id: ");
        var spanRestaurantName = $("<span />").text(item.RestaurantName);
        spanRestaurantName.attr("name", "RestaurantName");
        var spanReporterName = $("<span />").text(item.ReporterName);
        spanReporterName.attr("name", "ReporterName");
        var spanAveragePrice = $("<span />").text(item.AveragePrice);
        spanAveragePrice.attr("name", "AveragePrice");
        var spanRestaurantType = $("<span />").text(item.RestaurantType);
        spanRestaurantType.attr("name", "RestaurantType");
        var spanServiceRating = $("<span />").text(item.ServiceRating);
        spanServiceRating.attr("name", "ServiceRating");
        var spanCleanLinessRating = $("<span />").text(item.CleanLinessRating);
        spanCleanLinessRating.attr("name", "CleanLinessRating");
        var spanFoodRating = $("<span />").text(item.FoodRating);
        spanFoodRating.attr("name", "FoodRating");
        var spanNote = $("<span />").text(item.Note);
        spanNote.attr("name", "Note");
        var spanDate = $("<span />").text(item.Date);
        spanDate.attr("name", "Date");
        var spanId = $("<span />").text(item.Id);
        spanId.attr("name", "Id");
        h3.append(spanRestaurantName);
        h4.append(spanReporterName);
        h5.append(spanAveragePrice);
        h5_1.append(spanRestaurantType);
        h6.append(spanServiceRating);
        h6_1.append(spanCleanLinessRating);
        h6_2.append(spanFoodRating);
        p1.append(spanNote);
        p2.append(spanDate);
        p.append(spanId);
        style.append(h3);
        style.append(h4);
        style.append(h5);
        style.append(h5_1);
        style.append(h6);
        style.append(h6_1);
        style.append(h6_2);
        style.append(p1);
        style.append(p2);
        style.append(p);
        a.append(style);
        var li = $("<li/>");
        li.attr("data-filtertext", item.name);
        li.append(a);
        lstProducts.append(li);
    }
    lstProducts.listview("refresh");
    lstProducts.on("tap", "li", function(){
        currentProduct.Id = $(this).find("[name='Id']").text();
        currentProduct.RestaurantName = $(this).find("[name='RestaurantName']").text();
        currentProduct.ReporterName = $(this).find("[name='ReporterName']").text();
        currentProduct.AveragePrice = $(this).find("[name='AveragePrice']").text();
        currentProduct.RestaurantType = $(this).find("[name='RestaurantType']").text();
        currentProduct.ServiceRating = $(this).find("[name='ServiceRating']").text();
        currentProduct.CleanlinessRating = $(this).find("[name='CleanlinessRating']").text();
        currentProduct.FoodRating = $(this).find("[name='FoodRating']").text();
        currentProduct.Date = $(this).find("[name='Date']").text();
        currentProduct.Note = $(this).find("[name='Note']").text();
        //Set event for the list item
        $("#popupUpdateDelete").popup("open");
    });
}

$(document).on("pagebeforeshow", "#loadpage", function(){
    productHandler.loadProducts(displayProducts);
});

function deleteProduct(){
    var r = confirm("Delete Feedback\nId: "+currentProduct.Id);
    if(r==true){
        productHandler.deleteProduct(currentProduct.Id);
        productHandler.loadProducts(displayProducts);
    }
    $("#popupUpdateDelete").popup("close");
}

$(document).on("pagebeforeshow", "#updatedialog", function(){
    $("#txtNewRestaurantName").val(currentProduct.RestaurantName);
    $("#txtNewReporterName").val(currentProduct.ReporterName);
    $("#txtNewAveragePrice").val(currentProduct.AveragePrice);
    $("#txtNewRestaurantType").val(currentProduct.RestaurantType);
    $("#txtNewServiceRating").val(currentProduct.ServiceRating);
    $("#txtNewCleanliness").val(currentProduct.CleanlinessRating);
    $("#txtNewFoodRating").val(currentProduct.FoodRating);
    $("#txtNewDate").val(currentProduct.Date);
    $("#txtNewNote").val(currentProduct.Note);

    
});

function updateProduct(){
    var newRestaurantName = $("#txtNewRestaurantName").val();
    var newReporterName = $("#txtNewReporterName").val();
    var newAveragePrice = $("#txtNewAveragePrice").val();
    var newRestaurantType = $("#txtNewRestaurantType").val();
    var newServiceRating = $("#txtNewServiceRating").val();
    var newCleanLinessRating = $("#txtNewCleanliness").val();
    var newFoodRating = $("#txtNewFoodRating").val();
    var newDate = $("#txtNewDate").val();
    var newNote = $("#txtNewNote").val();
    
    productHandler.updateProduct(currentProduct.Id, newRestaurantName, newReporterName, newAveragePrice, newRestaurantType, newServiceRating, newCleanLinessRating, newFoodRating, newDate, newNote);
    $("#updatedialog").dialog("close");
}