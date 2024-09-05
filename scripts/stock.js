/** 
 * 공공데이터 지수시세정보, 주식시세정보 API를 활용하여 KOSPI, KOSDAQ, 삼성전자, 원하는 주식 정보(Default: HMM)의 출력을 구현
 */
const API_KEY_STOCK = ""
const API_KEY_INDEX = ""
const index1 = "코스피"
const index2 = "코스닥"
const stock1 = "삼성전자"
const stock2 = "HMM"
const index1_url = `https://apis.data.go.kr/1160100/service/GetMarketIndexInfoService/getStockMarketIndex?serviceKey=${API_KEY_INDEX}&resultType=json&pageNo=1&numOfRows=1&idxNm=${index1}`
const index2_url = `https://apis.data.go.kr/1160100/service/GetMarketIndexInfoService/getStockMarketIndex?serviceKey=${API_KEY_INDEX}&resultType=json&pageNo=1&numOfRows=1&idxNm=${index2}`
const stock1_url = `https://apis.data.go.kr/1160100/service/GetStockSecuritiesInfoService/getStockPriceInfo?serviceKey=${API_KEY_STOCK}&numOfRows=1&pageNo=1&resultType=json&itmsNm=${stock1}`
const stock2_url = `https://apis.data.go.kr/1160100/service/GetStockSecuritiesInfoService/getStockPriceInfo?serviceKey=${API_KEY_STOCK}&numOfRows=1&pageNo=1&resultType=json&itmsNm=${stock2}`
const myStock = document.getElementById("stock_input")
const stockBtn = document.getElementById("stock_button")


/**
 * 매개변수
 * url: API 요청, i: 블록
 *
 * 기능
 * async, await을 통한 fetch의 비동기 처리를 통해
 * 기준일, 지수이름, 고가, 저가, 시가, 종가, 등락률을 서버로부터 받아오고 배열에 저장한다
 * 이후 i번째 블록에 해당 정보를 출력한다
 */
async function getIndexInfo(url, i) {
    await fetch(url).then(response => response.json()).then(data => {
        let stock_info = new Array(5);
        const baseDate = data.response.body.items.item[0].basDt
        const indexName = data.response.body.items.item[0].idxNm
        const highPrice = data.response.body.items.item[0].hipr
        const lowPrice = data.response.body.items.item[0].lopr
        const marketPrice = data.response.body.items.item[0].mkp
        const closePrice = data.response.body.items.item[0].clpr
        const rate = data.response.body.items.item[0].fltRt
    
        stock_info[0] = `${baseDate.substr(0,4)}. ${baseDate.substr(4,2)}. ${baseDate.substr(6,2)}. 기준`
        stock_info[1] = `${indexName}`
        stock_info[2] = `고가: ${highPrice} 저가: ${lowPrice}`
        stock_info[3] = `시가: ${marketPrice} 종가: ${closePrice}`
        stock_info[4] = `등락률: ${setRateColor(rate, i)}%`
        /**
         * DOM Object 5개 활용
         */
        document.getElementsByClassName("base_date")[i].innerHTML = stock_info[0]
        document.getElementsByClassName("stock_name")[i].innerHTML = stock_info[1]
        document.getElementsByClassName("high_low")[i].innerHTML = stock_info[2]
        document.getElementsByClassName("market_close")[i].innerHTML = stock_info[3]
        document.getElementsByClassName("rate")[i].innerHTML = stock_info[4]
    }).catch(function(error) {
        console.error(error);
    });
}

/**
 * 매개변수
 * url: API 요청, i: 블록
 *
 * 기능
 * async, await을 통한 fetch의 비동기 처리를 통해
 * 기준일, 주식이름, 고가, 저가, 시가, 종가, 등락률을 서버로부터 받아오고 배열에 저장한다
 * 이후 i번째 블록에 해당 정보를 출력한다
 */
async function getStockInfo(url, i) {
    await fetch(url).then(response => response.json()).then(data => {
        let stock_info = new Array(5);
        const baseDate = data.response.body.items.item[0].basDt
        const stockName = data.response.body.items.item[0].itmsNm
        const highPrice = data.response.body.items.item[0].hipr
        const lowPrice = data.response.body.items.item[0].lopr
        const marketPrice = data.response.body.items.item[0].mkp
        const closePrice = data.response.body.items.item[0].clpr
        const rate = data.response.body.items.item[0].fltRt
    
        stock_info[0] = `${baseDate.substr(0,4)}. ${baseDate.substr(4,2)}. ${baseDate.substr(6,2)}. 기준`
        stock_info[1] = `${stockName}`
        stock_info[2] = `고가: ${highPrice} 저가: ${lowPrice}`
        stock_info[3] = `시가: ${marketPrice} 종가: ${closePrice}`
        stock_info[4] = `등락률: ${setRateColor(rate, i)}%`
    
        document.getElementsByClassName("base_date")[i].innerHTML = stock_info[0]
        document.getElementsByClassName("stock_name")[i].innerHTML = stock_info[1]
        document.getElementsByClassName("high_low")[i].innerHTML = stock_info[2]
        document.getElementsByClassName("market_close")[i].innerHTML = stock_info[3]
        document.getElementsByClassName("rate")[i].innerHTML = stock_info[4]
    }).catch(function(error) {
        console.error(error);
    });
}

/**
 * 매개변수
 * rate: 등락률, i: 블록
 * 
 * 기능
 * API response의 등락률의 절댓값이 1미만일 경우 .4(= 0.4), -.5(= -0.5) 등으로 반환되기 때문에
 * 가독성을 위해 0.n 형식으로 바꾼다.
 * 추가적으로 등락률에 따라 상승일 경우 빨강, 하락일 경우 파랑으로 i번째 블록의 글자색을 설정한다
 *
 * 리턴
 * 0.n 형식으로 포매팅된 rate
 */
function setRateColor(rate, i) {
    if(rate[0] == ".") 
        rate = rate.replace(".", "0.")
    if(rate[0] == "-" && rate[1] == ".") 
        rate = rate.replace(".", "0.")
    if(parseFloat(rate) >= 0) {
        document.getElementsByClassName("rate")[i].style.color = "red"
    } else {
        document.getElementsByClassName("rate")[i].style.color = "skyblue"
    }
    return rate
}

getIndexInfo(index1_url, 0) /*1번째 블록에 1번째 금융지수를 받아서 표시*/
getIndexInfo(index2_url, 1) /*2번째 블록에 2번째 금융지수를 받아서 표시*/
getStockInfo(stock1_url, 2) /*3번째 블록에 1번째 주식정보를 받아서 표시*/
getStockInfo(stock2_url, 3) /*4번째 블록에 2번째 주식정보를 받아서 표시 (default = HMM)*/

/** 
 *   input에 정확한 주식종목의 이름을 입력하고 send버튼을 누르면 4번째 블록에 해당 주식의 정보를 출력해준다
 */
stockBtn.addEventListener("click", function() {
    const myStockName = myStock.value
    const MyUrl = `https://apis.data.go.kr/1160100/service/GetStockSecuritiesInfoService/getStockPriceInfo?serviceKey=${API_KEY_STOCK}&numOfRows=1&pageNo=1&resultType=json&itmsNm=${myStockName}`
    myStock.value = ""
    getStockInfo(MyUrl, 3)
})