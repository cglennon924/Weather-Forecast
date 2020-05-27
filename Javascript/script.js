$(document).ready(function(){

    var apiKey = "84df96cacf76f88f4e4f11dea85bf159";
    var cityID = ""
    // Created an Empty Array for Favorite Cities
    var favArray = [];
    // Set todays date for Current Weather 
    var todaysDate = moment().format("LLLL");
    $("#todaysDate").text(todaysDate);
   



  var queryURL= "https://api.openweathermap.org/data/2.5/forecast?id=" + cityID + "&appid=" + apiKey;
    
  //Creating a button
    $('.button').on("Click", function(){
        var citySearch = JSON.parse(localStorage.getItem("searchCities"))
        var favCity = $('#Fav-City')
        $('#Fav-City').empty()

        if(citySearch === null){
        return
        }else{
            citySearch.forEach(function(City, Index){
            var buttonInfo = $("<input>").attr({
                type: "button",
                value: city,
                idenfifier: index,
                class: "row col-md-10 city-btn btn btn-dark"
            })
        })
    
    
    
    } 
    // Submit button//
    $('form').on("submit", function(event){
        event.preventDefault();

    });
    
    //5 Day Weather Forecast

    function fiveDay(){
        var forecast = $('#fiveDayForecast')
        var forecastQueryURL = "https://api.openweathermap.org/data/2.5/forecast?id=" + cityID + "&appid=" + apiKey;
        $('#fiveDayForecast').empty()

    $.ajax({
        url: forecastQueryURL,
        method: "GET"
        }).then(function(response){
            for (var i = 5; i <= 40; i+=8)  {
                var futureDates = moment(response.list[i].dt_txt).format("MM/DD/YYYY");;
                    console.log(futureDates)
                    cardDiv = $("<div>");
                    cardDiv.addClass("col col-5-day mx-1")
                    cardBody = $("<div>");
                    cardBody.addClass("card-body forecast-card");
                    cardTitle = $("<h5>").text(futureDates)
                    
                    cardDiv.append(cardBody);
                    cardBody.append(cardTitle);
            
                // Log the queryURL
        console.log(queryURL);

        // Log the resulting object
        console.log(response);
        // add temp content to html
        $("#temp").text("Temperature (K) " + response.main.temp);
       

        // Log the data in the console as well
        console.log("Wind Speed: " + response.wind.speed);
        console.log("Humidity: " + response.main.humidity);
        console.log("UV: " + response.main.uv)     
                
         // Transfer content to HTML
         $("#city").html("<h1>" + response.name + " Weather Details</h1>");
         $("#wind").text("Wind Speed: " + response.wind.speed);
         $("#humidity").text("Humidity: " + response.main.humidity);
         $("#uv").text("UV: " + response.main.uv)      
        }
    
    })
         
        
        
         fiveDay()
         uvIndex();
        }
    //Current Weather
    function currentWeather(){
     var currentQueryURL="https://api.openweathermap.org/data/2.5/weather?q=" + location + "&appid=" + apiKey;
    
    $.ajax({
        url: currentQueryURL,
        method: "GET"
        }).then(function(response){
            var tempNow = ("Current Tempreture: " + ((responseCF.main.temp - 273.15) *1.8 + 32).toPrecision(2)) + "F";
            $("#tempToday").text(tempFaren);
            $("#humidityToday").text("Current Humidity: " + responseCF.main.humidity + "%");
            $("#windToday").text("Current Wind Speed: " + responseCF.wind.speed + "mph");
            var lon = responseCF.coord.lon;
            var lat = responseCF.coord.lat;
            var cityID = responseCF.id
            console.log(cityID)
            console.log(lat)
            console.log(lon)
        })
    

        
        
         // Transfer content to HTML
         $(".city").html("<h1>" + response.name + " Weather Details</h1>");
         $(".wind").text("Wind Speed: " + response.wind.speed);
         $(".humidity").text("Humidity: " + response.main.humidity);
         $("#uv").text("UV: " + response.main.uv)      
        }
         // add temp content to html
        $(".temp").text("Temperature (K) " + response.main.temp);
        
        // Log the data in the console as well
        console.log("Wind Speed: " + response.wind.speed);
        console.log("Humidity: " + response.main.humidity);
        console.log("UV: " + response.main.uv) 
        
        
        uvIndex()
        currentWeather();
        });
    
    
    
    //UV Index
    function uvIndex(){
    var uvQueryURL="https://api.openweathermap.org/data/2.5/uvi?appid=" + apiKey + "&lat=" + lat + "&lon=" + lon;
    
    $.ajax({
        url: uvQueryURL,
        method: "GET"
        }).then(function(response){

        })
    
        
        };

     

})