window.addEventListener('load', ()=> {
  let long, lat;
  let temperatureDescription= document.querySelector('.temperature-description');
  let temperatureDegree= document.querySelector('.temperature-degree');
  let locationTimezone= document.querySelector('.location-timezone');
  let temperatureSection = document.querySelector(".temperature");
  let temperatureSpan = document.querySelector('.temperature span');


  if (navigator.geolocation) { 
    navigator.geolocation.getCurrentPosition(position => {
      long = position.coords.latitude;
      lat = position.coords.longitude;
      lat = 65;
      console.log(`Longitude:${long} and Latitude:${lat}`)
          

     //const api = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=02c241a320f17a83e0549c842299ec38`;
     
     let api = "https://cdn.shopify.com/s/files/1/0285/0127/8772/files/3.json?v=1595897623";
    
    console.log(api)

      fetch(api) 
      .then(data => {
          return data.json();

      })
      .then(data => {
        console.log(data);
        let {temp} = data.main;
        const {description} = data.weather[0];
        temp = (1.8)*(temp-273)+32;
    
        

        
        // set DOM elements from the API.
        temperatureDegree.textContent = Math.floor(temp);     
        temperatureDescription.textContent = description;
        locationTimezone.textContent = `${data.name}, ${data.sys.country}`;

        //set up the icon
        document.getElementById("image").src=`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

        // change to celcius/fahrenheit
        let celcius = (temp - 32) * (5/9);

      

        temperatureSection.addEventListener('click', () => {
          if (temperatureSpan.textContent === "F") {
            temperatureSpan.textContent = "C";
            temperatureDegree.textContent = Math.floor(celcius);


          } else {
            temperatureSpan.textContent = "F";
            temperatureDegree.textContent = Math.floor(temp);
          }
        })

      
         

        
      })

    },()=> console.log("error"), { enableHighAccuracy: true });

   

  } else {


  }

}); 

