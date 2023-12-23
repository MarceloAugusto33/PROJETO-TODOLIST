let id = 1
function adicionarTarefa() {
    let inputTarefa = document.querySelector('#inputTarefa');
    let modal = document.querySelector('.modal')
    let textoModal = document.querySelector('#texto-modal');
    let iconModal = document.querySelector('#icon-modal');


    if (!inputTarefa.value) {
        modal.style.width = '100%'
        modal.style.backgroundColor = 'orange'
        textoModal.innerHTML = 'Tarefa Vazia'
        iconModal.innerHTML = 'block'
        setTimeout(() => {
            modal.style.width = '0'
        }, 1000)
    } else {
        localStorage.setItem(`TAREFA${id}`, `${inputTarefa.value}`)
        iconModal.innerHTML = 'done'
        modal.style.width = '100%'
        modal.style.backgroundColor = 'rgb(5, 192, 5)'
        textoModal.innerHTML = 'Tarefa Adicionada'
        setTimeout(() => {
            modal.style.width = '0'
        }, 1200)
        mostrarTarefas()
    }
    verificarTarefas()
}


function removerTarefa(id) {
    let tarefa = document.querySelector(`#${id}`)
    let modal = document.querySelector('.modal')
    let textoModal = document.querySelector('#texto-modal');
    let iconModal = document.querySelector('#icon-modal');
    modal.style.width = '100%'
    textoModal.innerHTML = 'Tarefa removida'
    iconModal.innerHTML = 'delete'
    modal.style.backgroundColor = 'red'
    setTimeout(() => {
        modal.style.width = '0'
    }, 1000)
    tarefa.remove()
    localStorage.removeItem(id)
    verificarTarefas()
}

function completarTarefa(id) {
    let tarefa = document.getElementById(`${id}`)
    let paragrafo = tarefa.querySelector('p')
    let icon = tarefa.querySelector('.completo')

    if (tarefa.classList.contains('concluido')) {
        tarefa.classList.remove('concluido')
        paragrafo.classList.remove('linha')
        icon.innerHTML = 'trip_origin'
    } else {
        tarefa.classList.add('concluido')
        paragrafo.classList.add('linha')
        icon.innerHTML = 'check_circle'
        let modal = document.querySelector('.modal')
        let textoModal = document.querySelector('#texto-modal');
        let iconModal = document.querySelector('#icon-modal');
        modal.style.width = '100%'
        textoModal.innerHTML = 'Tarefa Completa'
        iconModal.innerHTML = 'done'
        modal.style.backgroundColor = 'green'
        setTimeout(() => {
            modal.style.width = '0'
        }, 1000)
    }
    verificarTarefas()

}

function verificarTarefas() {
    let tarefas = document.querySelectorAll('.card-tarefa')
    if (tarefas.length == 0) {
        document.querySelector('.container-tarefas').innerHTML = `<img src="img/undraw_to_do_list_re_9nt7.svg" alt="" id="img">`
        id = 1
    } else {
        img = document.querySelector('#img');
        if (!img) {
            return
        } else {
            img.remove()
        }
        return
    }
}

function EnviaForm(e) {
    e.preventDefault()
}

document.addEventListener('DOMContentLoaded', () => {
    mostrarTarefas()
    verificarTarefas()
})

function mostrarTarefas() {
    let inputTarefa = document.querySelector('#inputTarefa');
    let container = document.querySelector('.container-tarefas')
    container.innerHTML = ""
    for (let index = 0; index <= localStorage.length; index++) {
        let ChaveTarefa = localStorage.key(index);
        if (!ChaveTarefa || ChaveTarefa == 'href' || !'TAREFA'.includes(ChaveTarefa)) {
            console.log('Chaves que não Sao tarefas: ' + ChaveTarefa)
        } else {
            ChaveTarefa.toLocaleUpperCase();
            let Valor = localStorage.getItem(ChaveTarefa);

            container.innerHTML += `
        
            <div class="card-tarefa" id="${ChaveTarefa}">
                <span class="material-symbols-outlined completo" onclick="completarTarefa('${ChaveTarefa}')">trip_origin</span>
                <p>${Valor}</p>
                <span class="material-symbols-outlined" onclick="openModal('${ChaveTarefa}')">edit</span>
                <span class="material-symbols-outlined delete"onclick="removerTarefa('${ChaveTarefa}')">delete</span>
            </div>
            `
            id++
            inputTarefa.value = ""
        }
    }
}

function openModal(id) {
    let editModal = document.querySelector('.modalEditarTarefa');
    let element = document.querySelector(`#${id}`)
    editModal.style.display = 'flex'
    let b = editModal.querySelector('button');
    b.setAttribute('onclick', `edita(${id})`)
    editModal.querySelector('input').value = element.querySelector('p').innerHTML
}

function edita(id) {
    let editModal = document.querySelector('.modalEditarTarefa');
    let InputEdit = editModal.querySelector('input').value
    let paragrafoErro = editModal.querySelector('p');

    if (!InputEdit) {
        paragrafoErro.innerHTML = "Tarefa Vazia ou Invalida"
        paragrafoErro.style.color = 'red'
    } else {
        paragrafoErro.innerHTML = ""
        let idDoElemento = id.id
        localStorage.setItem(`${idDoElemento}`, InputEdit)
        editModal.style.display = 'none'
        id.querySelector('p').innerHTML = InputEdit
    }
}