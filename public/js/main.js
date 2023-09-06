const List = class {
    constructor() {
        this.$form = $('#form');
        this.$taskList = $('#tasksList')
        this.items = []
        this.init()
    }
    

    init() {
        fetch('/getitems').then(response => response.json())
        .then(data => 
            {this.items = data.items
            this.show()
        })
        .catch(err => console.log(err))

        $('#form').on('submit', (e) => {this.add(e)})
    }
    add(e) {
        if(validation() == true) {const newItem = {
            id: Math.floor(Math.random() * (1000 - 1 + 1)) + 1,
            descript: taskInput.value,
            options: option.value,
            main: mainTextAreaValue.value,
            check: getCheckedCheckBoxes(),
            but:  getInputButtons(),
            lin: getInputLinks()
        }
        deleteEmptyList()
        taskInput.value = ''
        option.value = '0'
        mainTextAreaValue.value = ''
        checkboxes[0].checked = true
        taskInput.focus()
        mainTextArea.classList.add('none')
        radioButtons.classList.add('none')
        dropdown.classList.add('none')
        buttonList.classList.add('none')
        document.querySelectorAll('.input-button').forEach(e => e.remove())
        document.querySelectorAll('.input-link-buttons').forEach(e => e.remove())
        this.append(newItem)
        this.save(newItem)}
    }



    append(item){
        this.items.push(item)
        $('#tasksList').append(`<li class="list-group-item justify-content-between task-item information" >
        <div class="main-list" id='main-list'>
            <div class="option-value">${item.options}</div>
            <div  class="task-text"><span class="task-title">${item.descript}<span></div>
            <div class="task-item__buttons">
                <button type="button" data-action="done" class="btn-action">
                    <img src="./img/tick.svg" alt="Done" width="18" height="18">
                </button>
                <button type="button" data-action="delete" class="btn-action">
                    <img src="./img/cross.svg" alt="Done" width="18" height="18">
                </button>
            </div>
        </div>
        <div class = 'hiden none'>
        <div id="hiden" class = "hidenText gh"><p>Текст</p><p class="bg-light">${item.main}</p></div>
        <div id="hiden" class = "hidenKeyboard gh"><p>Клавиатура</p><p class="bg-light">${item.check}</p></div>
        <div id="hiden" class = "hidenButtons gh"><p>Кнопки</p><p class="bg-light">${item.but}<p></div>
        <div id="hiden" class = "hideLinksInfo gh"><p>Ссылки</p><p class="bg-light">${item.lin}</p></div>
        </div>
     </li>`)
     deleteEmptyList()
    }
    show() {   
        this.items.forEach(item => {
                    $('#tasksList').append(`<li class="list-group-item justify-content-between task-item information" >
        <div class="main-list" id='main-list'>
            <div class="option-value">${item.options}</div>
            <div  class="task-text"><span class="task-title">${item.descript}<span></div>
            <div class="task-item__buttons">
                <button type="button" data-action="done" class="btn-action">
                    <img src="./img/tick.svg" alt="Done" width="18" height="18">
                </button>
                <button type="button" data-action="delete" class="btn-action">
                    <img src="./img/cross.svg" alt="Done" width="18" height="18">
                </button>
            </div>
        </div>
        <div class = 'hiden none'>
        <div id="hiden" class = "hidenText gh"><p>Текст</p><p class="bg-light">${item.main}</p></div>
        <div id="hiden" class = "hidenKeyboard gh"><p>Клавиатура</p><p class="bg-light">${item.check}</p></div>
        <div id="hiden" class = "hidenButtons gh"><p>Кнопки</p><p class="bg-light">${item.but}<p></div>
        <div id="hiden" class = "hideLinksInfo gh"><p>Ссылки</p><p class="bg-light">${item.lin}</p></div>
        </div>
     </li>`)
        })
        deleteEmptyList()
    }
    save(item) {
		fetch('/setitem', {
			method: 'post',
			body: JSON.stringify({"newitem": item})  ,
			headers: {
				'Content-Type': 'application/json'
			}
		})
			.then(response => response.json())
			.then(data => {})
			.catch(err => console.log(err));
	}
}

const form = document.querySelector('#form')
const taskInput = document.querySelector('#taskInput')
const tasksList = document.querySelector('#tasksList')
const emptyList = document.querySelector('#emptyList')
const option = document.querySelector('#floatingSelectGrid')
const mainTextArea = document.querySelector('#mainText')
const radioButtons = document.querySelector('#radio')
const dropdown = document.querySelector("#dropdownButtons")
const dropdownButton = document.querySelector('#dropdown-item-button')
const dropdowLink = document.querySelector('#dropdown-item-link')
const buttonList = document.querySelector('#button-list')
const mainTextAreaValue = document.querySelector('#exampleFormControlTextarea')
var inputButtons = document.getElementsByClassName('input-button');
var checkboxes = document.getElementsByClassName('btn-check');
var inputLinks = document.getElementsByClassName('input-link');


const openSettings = (e) =>{
    if(option.value !== '0'){
        mainTextArea.classList.remove('none')
        if(option.value !== 'SMS'){
            radioButtons.classList.remove('none')
            dropdown.classList.remove('none')
            buttonList.classList.remove('none')
        }else{
            radioButtons.classList.add('none')
            dropdown.classList.add('none')
            buttonList.classList.add('none')
        }
    } else {mainTextArea.classList.add('none')
    radioButtons.classList.add('none')
    dropdown.classList.add('none')
    buttonList.classList.add('none')}

}

const addButton = (e) => {
    e.preventDefault()
    const buttonHTML = '<li><input type ="text" class="form-control input-button" id="buttonText"  placeholder="Содержание кнопки"></li>'
    buttonList.insertAdjacentHTML('beforeend', buttonHTML)
}

const addLink = (e) => {
    e.preventDefault()
    const buttonHTML = '<li><div class="input-link-buttons"><input type ="text" class="form-control link input-link" id="buttonText"  placeholder="Текст кнопки"><input type ="text" class="form-control link input-link" id="buttonText"  placeholder="Ссылка"></li>'
    buttonList.insertAdjacentHTML('beforeend', buttonHTML)
}

const getCheckedCheckBoxes = () => {
    if (option.value !== 'SMS') 
    {var checkboxesChecked = [];
    for (var index = 0; index < checkboxes.length; index++) {
       if (checkboxes[index].checked) {
          checkboxesChecked.push(checkboxes[index].value);
       }}
    return checkboxesChecked;}
    else {
        return ''
    }
  }

  deleteEmptyList = () => {
    if(tasksList.children.length > 1) {
        emptyList.classList.add('none')
    }
  }


  const getInputButtons = () => {
    var inputValues = [];
    for (var index = 0; index < inputButtons.length; index++) {
    inputValues.push(inputButtons[index].value);
    }
    return inputValues;
  }

  const getInputLinks = () => {
    var inputValues = [];
    for (var index = 0; index < inputLinks.length; index++) {
    inputValues.push(inputLinks[index].value);
    }
    return inputValues;
  }


  const showInfo = (e) => {
    if(e.target.dataset.action === 'done'){
        const pNode = e.target.closest('.list-group-item')
        const taskTitle = pNode.querySelector(".hiden")
        taskTitle.classList.toggle('none')
    }

  }


form.addEventListener('submit', function(event) {
    event.preventDefault()

})

tasksList.addEventListener('click', showInfo)
dropdowLink.addEventListener('click', addLink)
dropdownButton.addEventListener('click', addButton)
option.addEventListener('click', openSettings)


// валидация
const validation = () =>{
    let result = true

    const lengthCheck = (input) => {
        if(option.value === "VK" && input.value.length > 4096){
            createErorr("Слишком много симолов в основном тексте")
            result = false
        } if(option.value === "Telegram" && input.value.length > 4096){
            createErorr("Слишком много симолов в основном тексте")
            result = false
        }if(option.value === "WatsApp" && input.value.length > 1000){
            createErorr("Слишком много симолов в основном тексте")
            result = false
        } if(option.value === "0"){
            createErorr("Выберите месседжер")
            result = false
        }if(input.value == 0){
            createErorr("Введите текст рассылки")
            result = false
    }
}

    const smsCheck = () => {
        if((getInputLinks().length !== 0 || getInputButtons().length !== 0) && option.value === "SMS"){
            result = false
            createErorr('SMS не поддерживает кнопки')
        }
    }

    const keyboardCheck = () => {
        if(getCheckedCheckBoxes() == "standart-keyboard"){
            if(option.value === "VK"){
                const sum = (getInputButtons().length + (getInputLinks().length/2))
                if(sum > 40){
                createErorr('Много кнопок!')
                result = false}
            } if(option.value === "Telegram"){
                if(getInputLinks().length !== 0){
                createErorr('Кнопка с ссылкойне поддерживется')
                result = false}
            } if(option.value === "WatsApp"){
                if(getInputLinks().length !== 0) {
                createErorr('Кнопка не поддерживется')
                result = false} 
                if(getInputButtons().length > 10)
                {
                    createErorr('Много кнопок!')
                    result = false 
                }else {
                    getInputButtons().forEach(el => {
                        if(el.length > 20){
                            createErorr("Много символов к кнопке")
                            result = false
                        }})
                }
            }
        }if(getCheckedCheckBoxes() == "inline-keyboard"){
            if(option.value === "VK"){
                const sum = (getInputButtons().length + (getInputLinks().length/2))
                if(sum > 10){
                createErorr('Много кнопок!')
                result = false}
            }if(option.value === "Telegram"){
                getInputButtons().forEach(el => {
                    if(el.length > 64){
                        createErorr("Много символов к кнопке")
                        result = false
                    }})
                getInputLinks().forEach(el => {
                    if( el%2 !== 0 )
                    if(el.length > 64){
                        createErorr("Много символов к кнопке")
                        result = false
                    }})
            }if(option.value === "WatsApp"){
                const sum = (getInputButtons().length + (getInputLinks().length/2))
                if(sum > 3 || getInputLinks().length/2 > 1){
                    createErorr('Много кнопок!')
                    result = false}
                getInputButtons().forEach(el => {
                    if(el.length > 20){
                        createErorr("Много символов к кнопке")
                        result = false
                    }})
                getInputLinks().forEach(el => {
                    if( el%2 !== 0 ){
                    if(el.length > 20){
                        createErorr("Много символов к кнопке")
                        result = false
                    }}})
            }
        }
    }

    const createErorr = (text) =>{
        alert(text)
    }


    if(taskInput.value == ""){
        result = false
        createErorr("Описание не заполнено")
    }
    lengthCheck(mainTextAreaValue)
    smsCheck()
    keyboardCheck()

    return result
}

new List
 
