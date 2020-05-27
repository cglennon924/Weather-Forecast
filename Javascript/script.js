$(document).ready(function () {

    var apiKey = "84df96cacf76f88f4e4f11dea85bf159";
    var location = "charlotte"
    // Created an Empty Array for Favorite Cities
    var favArray = [];
    // Set todays date for Current Weather 
    var todaysDate = moment().format("LLLL");
    $("#todaysDate").text(todaysDate);




    var queryURL = "https://api.openweathermap.org/data/2.5/forecast?id=" + location + "&appid=" + apiKey;

    //Creating a button
    $('.btn').on("click", function (event) {
        event.preventDefault()

        var citySearch = JSON.parse(localStorage.getItem("searchCities"))
        var favCity = $('#Fav-City')
        $('#Fav-City').empty()

        // if (citySearch === null) {
        //     return
        // } else {
        //     citySearch.forEach(function (City, Index) {
        //         var buttonInfo = $("<input>").attr({
        //             type: "button",
        //             value: city,
        //             idenfifier: index,
        //             class: "row col-md-10 city-btn btn btn-dark"
        //         })
        //     })

        // }


        //5 Day Weather Forecast

        currentWeather();
        fiveDay();


        //Current Weather
        function currentWeather() {
            var currentQueryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + location + "&appid=" + apiKey;
            console.log(currentQueryURL)
            $.ajax({
                url: currentQueryURL,
                method: "GET"
            }).then(function (responseCW) {
                var tempNow = ("Current Tempreture: " + ((responseCW.main.temp - 273.15) * 1.8 + 32).toPrecision(2)) + "F";
                $("#temp").text(tempNow);
                $("#humidity").text("Current Humidity: " + responseCW.main.humidity + "%");
                $("#wind").text("Current Wind Speed: " + responseCW.wind.speed + "mph");
                var lon = responseCW.coord.lon;
                var lat = responseCW.coord.lat;
                var cityID = responseCW.id
                console.log(location)
                console.log(lat)
                console.log(lon)
                uvIndex(lat, lon)
            // Transfer content to HTML
            $("#city").html("<h1>" + responseCW.name + " Weather Details</h1>");
           
            $("#uv").text("UV: " + responseCW.main.uv)
           
        // // Log the data in the console as well
            console.log("Wind Speed: " + responseCW.wind.speed);
            console.log("Humidity: " + responseCW.main.humidity);
        // console.log("UV: " + response.main.uv)
        })





            
        }


    });



    //UV Index
    function uvIndex(lat, lon) {
        var uvQueryURL = "https://api.openweathermap.org/data/2.5/uvi?appid=" + apiKey + "&lat=" + lat + "&lon=" + lon;

        $.ajax({
            url: uvQueryURL,
            method: "GET"
        }).then(function (response) {

        })


    };


    function fiveDay() {
        var forecast = $('#fiveDayForecast')
        var forecastQueryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + location + "&appid=" + apiKey;
        $('#fiveDayForecast').empty()

        $.ajax({
            url: forecastQueryURL,
            method: "GET"
        }).then(function (response) {
            for (var i = 5; i <= 40; i += 8) {
                var futureDates = moment(response.list[i].dt_txt).format("MM/DD/YYYY");;
                console.log(futureDates)
                cardDiv = $("<div>");
                cardDiv.addClass("col col-5-day mx-1")
                cardBody = $("<div>");
                cardBody.addClass("card-body forecast-card");
                cardTitle = $("<h5>").text(futureDates)
                cardBody.text(response.list[i].main.temp);
                cardDiv.append(cardBody);
                cardBody.append(cardTitle);

                // Log the queryURL
                console.log(queryURL);

                // Log the resulting object
                console.log(response);
                $(".card-body").append(cardDiv)
            


                // Log the data in the console as well
                //console.log("Wind Speed: " + response.wind.speed);
                //console.log("Humidity: " + response.main.humidity);
                //console.log("UV: " + response.main.uv)

                // Transfer content to HTML
            //     $("#city").html("<h1>" + response.name + " Weather Details</h1>");
            //     $("#wind").text("Wind Speed: " + response.wind.speed);
            //     $("#humidity").text("Humidity: " + response.main.humidity);
            //     $("#uv").text("UV: " + response.main.uv)
             }

        })


    }
})