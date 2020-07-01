$(document).ready(function(){
    // API Key Retrieved from Creating Account for Open Weather
    var apiKey = "84df96cacf76f88f4e4f11dea85bf159";
    var location = "";
    // Created an Empty Array for Favorite Cities
    var favArray = [];
    // Set todays date for Current Weather 
    var todaysDate = moment().format("LLLL");
    $("#todaysDate").text(todaysDate);
    
    // Function to retrieve search cities from local Storage and creates an button for them
    function createBtn () {
        var renderFavCity = JSON.parse(localStorage.getItem("searchCities"));
        $("#citySearch").empty()
        // If statement that prevents null values from being created as buttons
        if (renderFavCity === null) {
        return
        }else {
        renderFavCity.forEach(function (city, index) {
        var buttonInfo = $("<input>").attr({
            type: "button",
            value: city,
            idenfifier: index,
            class: "row col-md-10 city-btn btn btn-dark"
        })
        $("#citySearch").append(buttonInfo);
        })
        }             
    };

    // On click function that takes the value of the button selected and searches for its weather output. 
    $(document).on("click", "input", function () {                                      

        var location = $(this).val()                           
        console.log(location)                     
        $("#forecastCities").empty();                
        $("#weatherIcon").empty()                        
        currentWeather()  

    function currentWeather (){
    
    
    //URL Query for current weather by location. 

    var cfQueryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + location + "&appid=" + apiKey;
    
    $.ajax({
        url: cfQueryURL,
        method: "GET"
      }).then(function(responseCF) {
        console.log(responseCF);
        $("#cityReturn").text(responseCF.name);
        var cWeatherIcon = $("<img>").attr("src", "https://openweathermap.org/img/w/" + responseCF.weather[0].icon + ".png");
         $("#weatherIcon").append(cWeatherIcon);
        var tempFaren = ("Current Tempreture: " + ((responseCF.main.temp - 273.15) *1.8 + 32).toPrecision(2)) + "F";
        console.log(tempFaren)
        $("#tempToday").text(tempFaren);
        $("#humidityToday").text("Current Humidity: " + responseCF.main.humidity + "%");
        $("#windToday").text("Current Wind Speed: " + responseCF.wind.speed + "mph");
        var lon = responseCF.coord.lon;
        var lat = responseCF.coord.lat;
        var cityID = responseCF.id
        console.log(cityID)
        console.log(lat)
        console.log(lon)
        
        // Function to get UV Index
        function currentUVIndex (){
            //URL Query for current weather UV index by longitude and latitude from current weather api.  
            uxQueryURL = "https://api.openweathermap.org/data/2.5/uvi?appid=" + apiKey + "&lat=" + lat + "&lon=" + lon;

            $.ajax({
                url: uxQueryURL,
                method: "GET"
            }).then(function(responseCFUV) {
                console.log(responseCFUV);
                $("#uvToday").text("UV Index: ")
                uvValue = $("<span>").text(responseCFUV.value)
                $("#uvToday").append(uvValue)
                if (responseCFUV.value <= 3) {
                uvValue.attr("style", "background-color: green;")
                } else if (responseCFUV.value > 3 && responseCFUV.value <= 6) {
                uvValue.attr("style", "background-color: yellow;")
                }else if (responseCFUV.value > 6 && responseCFUV.value <= 9) {
                uvValue.attr("style", "background-color: orange;")
                } else{
                uvValue.attr("style", "background-color: red;")
                };
            });

        };
        
        // Function to find Five Day Forcast by City ID
        var fiveDayForcastDiv = $("#forecastCities");
        $("#fiveDayForcastDiv").empty();
        function forecastCities () {
        var ffQueryURL = "https://api.openweathermap.org/data/2.5/forecast?id=" + cityID + "&appid=" + apiKey;
       
        $.ajax({
            url: ffQueryURL,
            method: "GET"
          }).then(function(responseFF) {
            // For Loop with increases by 8 every time it plays to get future dates weather
            for (var i = 7; i <= 40; i+=8)  {
            var futureDates = moment(responseFF.list[i].dt_txt).format("MM/DD/YYYY");;
                console.log(futureDates)
                cardDiv = $("<div>");
                cardDiv.addClass("col col-5-day mx-1")
                cardBody = $("<div>");
                cardBody.addClass("card-body forecast-card");
                cardTitle = $("<h5>").text(futureDates)
                
                cardDiv.append(cardBody);
                cardBody.append(cardTitle);
                
                fiveDayForcastDiv.append(cardDiv);
                //Creates a image from API to display expected weather type (rain, sun, clouds etc)
                var fWeatherIcon = $("<img>").attr("src", "https://openweathermap.org/img/w/" + responseFF.list[i].weather[0].icon + ".png");
                cardTitle.append(fWeatherIcon);
                var forcastTemp = $("<li>").text(("Temperature: " + ((responseFF.list[i].main.temp - 273.15) *1.8 + 32).toPrecision(2)) + "F");
                var forcastHumidity = $("<li>").text("Humidity: " + responseFF.list[i].main.humidity + "%");
                forcastTemp.addClass("card-text");
                forcastHumidity.addClass("card-text")
                var unorderedList  = $("<ul>")
                unorderedList.append(forcastTemp, forcastHumidity);
                cardTitle.append(unorderedList);
               
                console.log(forcastTemp)
                console.log(forcastHumidity)

            }
            
            
            
        });
        };

        //calls UV Index and Five Day Forecast Functions
        currentUVIndex()
        forecastCities()

    });
    };      
    });
    
    // Search Button Location

    $("#searchBtn").on("click", function (e) {
        // Validates Weather the input was a valid city name for weather functions. 
        var cityInput = $("#searchInput").val().trim();

        var inputURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityInput + "&units=imperial&appid=" + apiKey;
        
        $.ajax({
            url: inputURL,
            method: "GET",
            success: 
                function () {
                    searchBtn();
                },
                statusCode: {
                    404: function() {
                        console.log("Not a City");
                        alert("Not A City, Try Again!");
                    }
                }
        })


    });

    function searchBtn () {
        //Sets a valid search city to local storage. 
        var favCity = $("#searchInput").val().trim();
        if (favCity === "") {}
         else {
            favArray.push(favCity);
            localStorage.setItem("searchCities", JSON.stringify(favArray));
            $("#searchInput").val("");
            createBtn ();
        }


    }



    createBtn()
    
});