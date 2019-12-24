$.ajax({
    url: "https://api.openweathermap.org/data/2.5/weather?q=Phoenix&appid=5fc03cb1215e62a9fc90d5f3f388336f",
    method: "GET"
}).then(function (response) {

    console.log("city:", response.name)
    console.log("Date:", moment(response.dt, "X").format("l"))
    console.log("temperature:", ((response.main.temp - 273.15) * 1.8) + 32)
    $.ajax({
        url: "http://api.openweathermap.org/data/2.5/forecast?q=" + response.name + "&appid=5fc03cb1215e62a9fc90d5f3f388336f",
        method: "GET"
    })
        .then(function (response) {
            // console.log(response)
            var previousDate = "";
           // previousDate = moment(response.list[0].dt, "X").format("l")
                
            for (let i = 0; i < response.list.length; i++) {
                var current = moment(response.list[i].dt, "X").format("l");
                if ( current != previousDate) {
                    console.log("Date:", moment(response.list[i].dt, "X").format("l"))
                    console.log("temperature:", ((response.list[i].main.temp - 273.15) * 1.8) + 32)
                  
                }
                 
                
                previousDate = moment(response.list[i].dt, "X").format("l")
                

               
            }
            console.log()
        })

})