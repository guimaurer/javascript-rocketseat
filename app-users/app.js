var cardList = document.querySelector("body #renderlist");
var cardImput = document.querySelector("body #card-input");
var cardButton = document.querySelector("body #card-button");

var cards = JSON.parse(localStorage.getItem('_user_list')) || [];



function renderCards() {
  cardList.innerHTML = "";
  for (card of cards) {
    var cardDev = document.createElement("div");
    cardDev.setAttribute("class", "card-itens");
    var pos = cards.indexOf(card);

    var avatar = document.createElement("img");
    avatar.setAttribute("src", card.avatar_url);
    avatar.setAttribute("class", "card-img-top");
    avatar.setAttribute("alt", "imagem de perfil do desenvolvedor ");
    cardDev.appendChild(avatar);

    var infoDev = document.createElement("div");
    infoDev.setAttribute("class", "info-dev");

    var nameDev = document.createElement("h5");
    var textNamedev = document.createTextNode(card.name);
    nameDev.appendChild(textNamedev);
    infoDev.appendChild(nameDev);

    var bioDev = document.createElement("p");
    bioDev.setAttribute("class", "bio-dev");
    var textBiodev = document.createTextNode((card.bio==null)? "Usuário sem Bio": card.bio);
    bioDev.appendChild(textBiodev);
    infoDev.appendChild(bioDev);

    var link = document.createElement("a");
    link.setAttribute("href", "#");
    link.setAttribute("onclick", "excluirTodo(" + pos + ")");
    var nameLink = document.createTextNode("Excluir");
    link.appendChild(nameLink);
    infoDev.appendChild(link);

    cardDev.appendChild(infoDev);
    cardList.appendChild(cardDev);
  }
}

function excluirTodo(pos) {
  cards.splice(pos, 1);
  renderCards();
  saveToStorage() 
}

function addCard() {
  var textcard = cardImput.value;   
    axios
      .get("https://api.github.com/users/" + textcard, "data")
      .then(res => {       
        cards.push(res.data);
        renderCards();
        saveToStorage() 
      })
      .catch(err => {
        alert('Usuário nao encontrado')
      });

    cardImput.value = "";
} 
cardButton.onclick = addCard;

function saveToStorage() {
  localStorage.setItem("_user_list", JSON.stringify(cards));
}

renderCards();

