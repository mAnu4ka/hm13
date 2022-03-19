let form = document.querySelector('form')
let main = document.querySelector('main')
let form2 = document.querySelector('.form2')
let count = 0
let del = document.querySelector('.delete')
let input1 = document.querySelector('input[data-inp]')
let input2 = document.querySelector('input[data-inp2]')
let course_modal = document.querySelector('.course-modal')
let course_create = document.querySelector('.course-modal-mobil')
let bg_modal = document.querySelector('.bg-modal')
let body = document.querySelector('body')
let h1 = document.querySelector('.h1')

let arr_users = [{
    id: 1,
    age: 20,
    name: 'Robert',
    count: 1
}]

const showModal = () => {
    bg_modal.style.display = "block"
    course_modal.style.display = "flex"
    body.style.overflow = 'hidden'
    course_modal.style.width = '632px'
    course_modal.style.height = '400px'
    setTimeout(() => {
        bg_modal.style.opacity = "1"
        course_modal.style.opacity = "1"
    }, 100);

    setTimeout(() => {
        course_modal.classList.add('mobail-modal')
    }, 150);

}

const closeModal = () => {
    bg_modal.style.opacity = "0"
    course_modal.style.opacity = "0"
    course_modal.style.width = "0px"
    course_modal.style.height = '0px'
    body.style.overflow = 'scroll'
    setTimeout(() => {
        bg_modal.style.display = "none"
        course_modal.style.display = "none"
        course_modal.classList.remove('mobail-modal')
    }, 100);
}

form.onsubmit = (event) => {
    event.preventDefault()

    let userData = {
        id: Math.random(),
        count: arr_users.length + 1
    }

    let fm = new FormData(form)


    fm.forEach((value, key) => {
        userData[key] = value
    })

    arr_users.push(userData);

    RELOAD_ITEMS(arr_users)
}

const RELOAD_ITEMS = (arr) => {
    main.innerHTML = ""

    for (let item of arr) {
        let div = document.createElement('div')
        let count = document.createElement('p')
        let name = document.createElement('p')
        let year = document.createElement('p')
        let opc = document.createElement('p')
        let del = document.createElement('p')


        div.setAttribute('id', item.id)
        div.classList.add('top')
        count.classList.add('gre')
        name.classList.add('gre', 'ff')
        year.classList.add('gre', 'fff')
        opc.classList.add('gre', 'ffff')
        del.style.marginLeft = '800px'



        count.innerText = item.count
        name.innerText = item.name
        year.innerText = item.age
        opc.innerText = 'изменить'
        del.innerText = 'удалить'

        div.append(count, name, year, opc, del)
        main.append(div)

        del.onclick = () => MANAGE_ELEMENT({
            id: item.id,
            type: "delete"
        })
        opc.onclick = () => {
            MANAGE_ELEMENT({
                id: item.id,
                type: "edit"
            })
        }
    }
}

RELOAD_ITEMS(arr_users)
form2.onsubmit = (event) => {
    event.preventDefault()
}
const MANAGE_ELEMENT = (mass) => {
    let find = arr_users.find(item => item.id === mass.id)
    let idx = arr_users.indexOf(find)
    if (mass.type == "delete") {
        showModal()
        h1.innerText = arr_users[idx].name
        input2.remove()
        del.onclick = () => {
            if (input1.value == arr_users[idx].name) {
                arr_users.splice(idx, 1)
                closeModal()
                RELOAD_ITEMS(arr_users)
            } else return

        }
    } else if (mass.type == "edit") {
        showModal()
        input1.value = arr_users[idx].name
        input2.value = arr_users[idx].age
        del.onclick = () => {
            arr_users[idx].name = input1.value
            arr_users[idx].age = input2.value
            RELOAD_ITEMS(arr_users)
        }
    }
}