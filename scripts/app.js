/**
 * 마우스에 반응하여 색깔이 변하는 반응형 사이드 네비게이션 기능 구현
 */

const navSideBtns = document.getElementsByClassName("navigation_side_button")
const navSideText = document.getElementsByClassName("navigation_side_text")

for(let i=0; i<4; i++) {
    navSideBtns[i].addEventListener("mouseover", btnOver)
    navSideBtns[i].addEventListener("mouseout", btnOut)
    navSideBtns[i].addEventListener("mouseover", function() {
        navSideText[i].style.visibility = "visible"
    })
    navSideBtns[i].addEventListener("mouseout", function() {
        navSideText[i].style.visibility = "hidden"
    })
}

/**
 * 기능
 * 마우스가 올라가면 아이콘을 초록색으로 바꿔준다
 */
function btnOver() {
    this.style.backgroundColor = "#029558"
}

/**
 * 기능
 * 마우스가 내려가면 아이콘을 흰색으로 바꿔준다
 */
function btnOut() {
    this.style.backgroundColor = "white"
}