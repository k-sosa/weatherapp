
let searchArray = []
let citySearch = $(".searchbox").val();
saveSearch(citySearch)
function saveSearch( citySearch){
     let storage = localStorage.getItem("savedSearches")
          if(storage === null && citySearch.length>0){
            searchArray.push(citySearch)
            localStorage.setItem("savedSearches",JSON.stringify(searchArray))//stringify converts array to string
          }
          else {
              searchArray = JSON.parse(storage)//parse converts string to array
              searchArray.push(citySearch)
          }
          $(".previous-search").empty()
         for (let index = 0; index < searchArray.length; index++) {
             
               if(searchArray[index].length>0){
                let button = $("<button>")
                button.text(searchArray[index])
                $(".previous-search").append(button,"<br>")
                localStorage.setItem("savedSearches",JSON.stringify(searchArray))//stringify converts array to string
               }
               
         }

}


$("#search-icon").on("click",function () {
     citySearch = $(".searchbox").val();


    saveSearch(citySearch)
 



   
    $.ajax({
        url: "https://api.openweathermap.org/data/2.5/weather?q=" + citySearch + "&appid=5fc03cb1215e62a9fc90d5f3f388336f",
        method: "GET"
    }).then(function (response) {

        const city1 = response.name
        const cityName = $("#city-title")
        cityName.text(city1)

        

        console.log("Date:", moment(response.dt, "X").format("l"))
        let temp = ((response.main.temp - 273.15) * 1.8) + 32
        temp = Math.round(temp)
        console.log("temperature:", temp)
        $("#temperature").text(temp)
        const humidity1 = response.main.humidity
        $("#humidity").text(humidity1)
        const windSpeed = response.wind.speed
        $("#wind-speed").text(windSpeed)
        const iconcode = response.weather.icon //not sure why this is greyed out
        const longitude = response.coord.lon
        const latitude = response.coord.lat
        
        $.ajax({
            url: "http://api.openweathermap.org/data/2.5/forecast?q=" + response.name + "&appid=5fc03cb1215e62a9fc90d5f3f388336f",
            method: "GET"
        })
            .then(function (response) {
                // console.log(response)
                var previousDate = "";
                // previousDate = moment(response.list[0].dt, "X").format("l")
                 let count = 0  
                for (let i = 0; i < response.list.length; i++) {
                    var current = moment(response.list[i].dt, "X").format("l");
                    if (current != previousDate) {
                        let day = moment(response.list[i].dt, "X").format("l")
                        console.log("Date:", day )
                        $("#date"+count).text(day)
                        
                        let temp = ((response.list[i].main.temp - 273.15) * 1.8) + 32
                        temp = Math.round(temp)
                        $("#temp"+count).text(temp)

                        let humidity = response.list[i].main.humidity
                        $("#humidity"+count).text(humidity)

                        let iconcode = response.list[i].weather.icon
                        const iconUrl = "http://openweathermap.org/img/w/" + iconcode + ".png"
                        $('#wicon'+count).attr('src', iconUrl)


                          count++
                    }


                    previousDate = moment(response.list[i].dt, "X").format("l")



                }
                $.ajax({
                    url: "http://api.openweathermap.org/data/2.5/uvi?lat=" + latitude + "&lon=" + longitude + "&appid=5fc03cb1215e62a9fc90d5f3f388336f",
                    method: "GET"
                }).then(function (response) {
                    $("#uv-index").text(response.value)
                    console.log("uv index:", response.value);
                })

            })

    })
});