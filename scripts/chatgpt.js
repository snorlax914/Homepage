/** 
 *  openAI 의 API를 사용하여 chatGPT 기반 챗봇을 구현
 */

const API_KEY_GPT = ""
const sendBtn = document.getElementById("send")
const clearBtn = document.getElementById("clear")

/**
 * 기능
 * async, await을 통한 fetch의 비동기 처리를 통해
 * input에 입력된 메시지에 대한 답장을 서버로부터 받아온다
 * 이후 메시지박스 형태로 답장을 div#chat에 출력한다
 */
async function getMessage() {
    const myMessage = document.getElementById("chat_input").value;
    let template = `<div class="line"><span class="chat_box mine">${myMessage}</span></div>`
    insetrtMessage(template)

    const options = {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${API_KEY_GPT}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            model: "text-davinci-003",
            prompt: myMessage,
            max_tokens: 100
        }) 
    }
    document.getElementById("chat_input").value = ""
    try {
        const response = await fetch("https://api.openai.com/v1/completions", options)
        const data = await response.json()
        let template = `<div class="line"><span class="chat_box">${data.choices[0].text}</span></div>`
        insetrtMessage(template)
    } catch(error) {
        console.error(error)
    }
}

/**
 * 매개변수
 * templat: 메시지 내용을 담고있는 div
 * 기능
 * div#chat에 메시지박스 삽입
 */
function insetrtMessage(template) {
    document.getElementById("chat").insertAdjacentHTML("beforeend", template)
}

/**
 * 기능
 * div#chat에 있는 모든 메시지박스 삭제
 */
function clearMessage() {
    chatBox = document.getElementById("chat")
    while(chatBox.firstChild) {
        chatBox.removeChild(chatBox.firstChild)
    }
}

sendBtn.addEventListener("click", getMessage)
clearBtn.addEventListener("click", clearMessage)