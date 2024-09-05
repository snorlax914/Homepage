/** 
 * 시계 기능과 Open weather API를 활용한 실시간날씨 정보의 출력을 구현
 */

const now = new Date();
const date = document.getElementById("date");
const time = document.getElementById("time");
const greeting = document.getElementById("greeting");
const weatherInfoContainer = document.getElementById("weather_info_container");
const API_KEY_WEATHER = "";
date.innerHTML = `${dateToday(now.getDay())}, ${now.getFullYear()}. ${(now.getMonth()+1).toString().padStart(2, "0")}. ${now.getDate().toString().padStart(2, "0")}.`;
greeting.innerHTML = `good ${hourToTime(now.getHours())}, 휘수`;

/** 
 * 기능
 * Date() 함수를 통해 날짜와 시각을 받아와서 현재 시각을 00:00:00 형태로 formatting하여 화면에 출력한다
 * 이 함수를 setInterval을 통해 1초 마다 계속 호출한다
 */
function setClock() {
    const now = new Date();
    time.innerHTML = `${now.getHours().toString().padStart(2, "0")} : ${now.getMinutes().toString().padStart(2, "0")} : ${now.getSeconds().toString().padStart(2, "0")}`;
}
setInterval(setClock, 1000)


/** 
 * 매개변수
 * day: 0~6으로 나타내어지는 요일의 값
 * 
 * 기능
 * Date() 함수를 통해 받아온 요일은 0~6으로 나타내지기 때문에
 * 이를 swith문을 통해 문자형태로 바꿔준다
 */
function dateToday(day) {
    switch(day) {
        case 0: 
            return "Sun";
            break;
        case 1: 
            return "Mon";
            break;
        case 2: 
            return "Tue";
            break;
        case 3: 
            return "Wwe";
            break;
        case 4: 
            return "Thu";
            break;
        case 5: 
            return "Fri";
            break;
        case 6: 
            return "Sat";
            break;
    }
}


/** 
 * 매개변수
 * hour: 현재 시간
 * 
 * 기능
 * 현재 시간에 따라 화면의 인사말을 설정한다
 */
function hourToTime(hour) {
    if(hour >= 18) {
        return "Evening";
    } else if(hour >=12) {
        return "Afternoon";
    } else if(hour >= 6) {
        return "Moring";
    } else return "Night";
}

/** 
 * 기능
 * navigator.geolocation.getCurrentPosition 의 호출이 성공했을 때 호출되는 함수
 * 위도와 경도를 받아오고 이 값을 바탕으로 해당 지역의 날씨를 API를 통해 요청한다
 * 추가로 날씨가 Rain 이면 Don't forget to bring your umbrella! 라는 문자도 화면에 출력한다
 */
async function onGeoOk(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY_WEATHER}&units=metric`;
    await fetch(url).then(response => response.json()).then(data => {
        const city = document.getElementById("city");
        const weather = document.getElementById("weather");
        const temp = document.getElementById("temp");
        city.innerHTML = data.name;
        weather.innerHTML = data.weather[0].main;
        temp.innerHTML = `${data.main.temp}℃`;
        if(data.weather[0].main == "Rain") {
            let template = `<span class="weather_info" id="city">Don't forget to bring your umbrella!</span>`
            weatherInfoContainer.insertAdjacentHTML("beforeend", template)
        }
    }).catch(function(error) {
        console.error(error);
    });
}

/** 
 * 기능
 * navigator.geolocation.getCurrentPosition 의 호출이 실패하거나 위치정보를 허용하지 않았을 때 호출되는 함수
 * alert를 통해 에러 메시지를 출력한다
 */
function onGeoError() {
    alert("error");
}

navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError);