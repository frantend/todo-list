const inputTarefa = document.getElementById('texto-tarefa');
const button = document.getElementById('criar-tarefa');
const lista = document.getElementById('lista-tarefas');
const btnApagaTudo = document.getElementById('apaga-tudo');
const btnRemoveFinalizados = document.getElementById('remover-finalizados');
const btnRemoveSelecionado = document.getElementById('remover-selecionado');
const btnMoverCima = document.getElementById('mover-cima');
const btnMoverBaixo = document.getElementById('mover-baixo');
const btnSalvar = document.getElementById('salvar-tarefas');

function adicionarTarefa() {
  button.addEventListener('click', () => {
    const liTarefa = document.createElement('li');
    liTarefa.innerText = inputTarefa.value;
    lista.appendChild(liTarefa);
    inputTarefa.value = '';
  });
}
adicionarTarefa();

const liTarefa = document.getElementsByTagName('li');

lista.addEventListener('click', (e) => {
  if (e.target !== e.currentTarget) {
    for (let index = 0; index < liTarefa.length; index += 1) {
      liTarefa[index].classList.remove('selected');
      liTarefa[index].style.backgroundColor = '';
    }
    for (let index = 0; index < liTarefa.length; index += 1) {
      e.target.classList.add('selected');
      e.target.style.backgroundColor = 'gray';
    }
  }
});

// 9 - Clicar duas vezes em um item, faz com que ele seja riscado, indicando que foi completado. Deve ser possível desfazer essa ação clicando novamente duas vezes no item.
lista.addEventListener('dblclick', (e) => {
  e.target.classList.toggle('completed');
});

// 10 - Adicione um botão que quando clicado deve apagar todos os itens da lista
btnApagaTudo.addEventListener('click', () => {
  lista.innerText = '';
});

// 11 - Adicione um botão que quando clicado remove somente os elementos finalizados da sua lista
btnRemoveFinalizados.addEventListener('click', () => {
  const completed = document.querySelectorAll('.completed');
  completed.forEach((item) => {
    item.remove();
  });
});

// 14 - Adicione um botão que, quando clicado, remove o item selecionado
btnRemoveSelecionado.addEventListener('click', () => {
  const selecionado = document.querySelectorAll('.selected');
  selecionado.forEach((item) => {
    item.remove();
  });
});

// 13 - Adicione dois botões, que permitam mover o item selecionado para cima ou para baixo na lista de tarefas
btnMoverCima.addEventListener('click', () => {
  const selecionado = document.querySelector('.selected');
  if (selecionado) {
    const itemAnterior = selecionado.previousElementSibling;
    if (itemAnterior) {
      selecionado.parentNode.insertBefore(selecionado, itemAnterior);
    }
  }
});

btnMoverBaixo.addEventListener('click', () => {
  const selecionado = document.querySelector('.selected');
  if (selecionado) {
    const itemSeguinte = selecionado.nextElementSibling;
    if (itemSeguinte) {
      selecionado.parentNode.insertBefore(itemSeguinte, selecionado);
    }
  }
});

// 12 - Adicione um botão que salva o conteúdo da lista. Se você fechar e reabrir a página, a lista deve continuar no estado em que estava
btnSalvar.addEventListener('click', () => {
  const listaString = JSON.stringify(lista.innerHTML);
  localStorage.setItem('listaDeItens', listaString);
});

window.onload = () => {
  const listaString = localStorage.getItem('listaDeItens');
  const listaDeItens = JSON.parse(listaString);
  const listaOnload = document.getElementById('lista-tarefas');
  listaOnload.innerHTML = listaDeItens;
};
