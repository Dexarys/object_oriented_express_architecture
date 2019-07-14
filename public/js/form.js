function alertBox() {
    alert('Hello');
}

function addArticle() {
    // On évite de recharger la page
    event.preventDefault();

    /**
     * Création de la div global
     */

    var first = document.querySelector('.liste-articles');
    var div = document.createElement('div');
    div.className = "add form-row";

    /////////////////////////////////////


    /**
     * Elément image
     */

    var imgDiv = document.createElement('div');
    imgDiv.className = "img-article col-2"
    var imgBalise = document.createElement('img');

    imgDiv.appendChild(imgBalise);
    div.appendChild(imgDiv);
    ////////////////////////////////////


    /**
     * Elément article
     */
    var artDiv = document.createElement('div');
    artDiv.className = "form-group div-article col-3"
    var artInput = document.createElement('input');
    artInput.oninput = (event) => {
        this.blurRequeteInfosArticle(event);
    }
    artInput.setAttribute("list", "articles");
    artInput.name = "article";
    artInput.className = "article form-control";
    artInput.placeholder = "Article...";


    artDiv.appendChild(artInput);
    div.appendChild(artDiv);
    /////////////////////////////////////


    /**
     * Elément conditionnement
     */
    var conditionnementDiv = document.createElement('div');
    conditionnementDiv.className = "form-group div-conditionnement col-2"
    var conditionnementInput = document.createElement('input');
    conditionnementInput.type = "text";
    conditionnementInput.disabled = "true";
    conditionnementInput.name = "conditionnement";
    conditionnementInput.className = "conditionnement form-control";
    conditionnementInput.placeholder = "Conditionnement";
    conditionnementDiv.appendChild(conditionnementInput);
    div.appendChild(conditionnementDiv);
    ////////////////////////////////////



    /**
     * Elément quantite
     */
    var quantiteDiv = document.createElement('div');
    quantiteDiv.className = "form-group div-quantite col-2"
    var quantiteInput = document.createElement('input');
    quantiteInput.type = "number";
    quantiteInput.name = "quantite";
    quantiteInput.className = "quantite form-control";
    quantiteInput.placeholder = "Quantité";
    quantiteDiv.appendChild(quantiteInput);
    div.appendChild(quantiteDiv);
    /////////////////////////////////////


    /**
     * Elément teinte
     */
    var teinteDiv = document.createElement('div');
    teinteDiv.className = "form-group div-teinte col-2"
    div.appendChild(teinteDiv);
    /////////////////////////////////////

    /**
     * Elément caché - libelle
     */
    var libelleDiv = document.createElement('div');
    libelleDiv.className = "div-libelle";
    var libelleInput = document.createElement('input');
    libelleInput.hidden = "true";
    libelleInput.className = "libelle";
    libelleInput.name = "libelle";
    libelleDiv.appendChild(libelleInput);
    div.appendChild(libelleDiv);
    /////////////////////////////////////


    /**
     * Elément caché - prix
     */
    var prixDiv = document.createElement('div');
    prixDiv.className = "div-prix";
    var prixInput = document.createElement('input');
    prixInput.hidden = "true";
    prixInput.className = "prix";
    prixInput.name = "prix";
    prixDiv.appendChild(prixInput);
    div.appendChild(prixDiv);
    /////////////////////////////////////


    /**
     * Elément caché - quantite_unite
     */
    var nombre_uniteDiv = document.createElement('div');
    nombre_uniteDiv.className = "div-nombre_unite";
    var nombre_uniteInput = document.createElement('input');
    nombre_uniteInput.hidden = "true";
    nombre_uniteInput.className = "nombre_unite";
    nombre_uniteInput.name = "nombre_unite";
    nombre_uniteDiv.appendChild(nombre_uniteInput);
    div.appendChild(nombre_uniteDiv);
    //////////////////////////////////////



    /**
     * Bouton sup
     */
    var supDiv = document.createElement('div');
    var sup = document.createElement('i');
    sup.className = "fas fa-times del";
    sup.onclick = () => {
        this.deleteArticle(div);
    }
    supDiv.appendChild(sup);
    div.appendChild(supDiv);
    /////////////////////////////////////


    // On ajoute tout à la fin
    first.appendChild(div);
}   

/**
* deleteArticle
* Supprime la ligne article choisis
* @param {HTMLBodyElement} item 
*/
function deleteArticle(item) {
    var first = document.querySelector('.add').parentNode;
    first.removeChild(item);
}

/**
* blurRequeteClient
* Est appelée après choix du client dans le formulaire
* Récupère les informations du client choisis
*/
function blurRequeteClient() {
    if (document.getElementById('client').value !== "") {
        document.getElementById('client').style.border = "";
    }
    var client = document.getElementById('client').value;

    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://localhost:3000/client?client=' + client);

    xhr.addEventListener('readystatechange', () => {
        if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
            var response = JSON.parse(xhr.response);
            document.getElementById('label-cc').innerHTML = response.codeClient;
            document.getElementById('label-ad').innerHTML = response.adresse;
            document.getElementById('label-cp').innerHTML = response.codePostal;
            document.getElementById('label-vl').innerHTML = response.ville;
        }
    })

    xhr.send()
}


/**
* blurRequeteInfosArticle
* Est appelée après choix d'un article
* Récupère les informations du article choisis
* @param {Object} event - L'élément sélectionner dans le formulaire
*/
function blurRequeteInfosArticle(event) {
    var article = event.target.value;
    var parent = event.target.parentNode;
    var node = parent.parentNode;

    if (article !== "") {
        node.querySelector('.article').style.border = "";
    }

    var imgArticle = node.querySelector('.img-article');
    var prix = node.querySelector('.prix');
    var nombre_unite = node.querySelector('.nombre_unite');
    var quantite = node.querySelector('.quantite');
    var conditionnement = node.querySelector('.conditionnement');
    var libelle = node.querySelector('.libelle');

    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://localhost:3000/article?article=' + article);

    xhr.addEventListener('readystatechange', () => {
        if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
            var response = JSON.parse(xhr.response);

            if (xhr.responseText.teinte) {
                var teinteDiv = node.querySelector('.div-teinte');
                teinteDiv.className = "form-group div-teinte col-2";

                if (node.querySelector('.teinte')) {
                    var teinte = node.querySelector('.teinte');
                    teinteDiv.removeChild(teinte)
                }

                var teinteInput = document.createElement('input');
                teinteInput.className = "teinte form-control";
                teinteInput.type = "text";
                teinteInput.name = "teinte";
                teinteInput.placeholder = "Teinte";
                teinteDiv.appendChild(teinteInput);
            }

            libelle.value = response.libelle_article;
            prix.value = response.prix;
            nombre_unite = response.nombre_unite;
            quantite.max = response.quantiteMax;
            quantite.placeholder = `max: ${response.quantiteMax}`;
            conditionnement.value = response.conditionnement;

            if (imgArticle.querySelector('img')) {
                var imgp = imgArticle.querySelector('img');
                imgArticle.removeChild(imgp)
            }
            var img = document.createElement('img');
            img.src = response.img;
            img.className = "article-img";
            imgArticle.appendChild(img)
        }
    })

    xhr.send()
}


/**
* formValid
* Vérification du formulaire
* On enlève les champs null
*/
function formValid() {
    var node = document.querySelectorAll('.add');
    let valid = false;


    if (document.getElementById('client').value === "") {
        document.getElementById('client').style.border = "2px solid red";
        valid = false;
    } else {
        document.getElementById('client').style.border = "";
        var arr = [].slice.call(node);

        arr.forEach((element, key) => {
            var article = element.querySelector('.article').value;
            let articleInput = element.querySelector('.article');
            articleInput.style.border = "";
            if (article === "") {
                articleInput.style.border = "2px solid red";
                valid = false;
            }
            var conditionnement = element.querySelector('.conditionnement').value;
            let conditionnementInput = element.querySelector('.conditionnement');
            conditionnementInput.style.border = "";
            if (conditionnement === "") {
                conditionnementInput.style.border = "2px solid red";
                valid = false;
            }
            var quantite = element.querySelector('.quantite').value;
            let quantiteInput = element.querySelector('.quantite');
            quantiteInput.style.border = "";
            if (quantite === "") {
                quantiteInput.style.border = "2px solid red";
                valid = false;
            }   
            var teinte = "";
            if (element.querySelector('.teinte')) {
                teinte = element.querySelector('.teinte').value;
                var teinteInput = element.querySelector('.teinte');
                teinteInput.style.border = "";
                if (teinte === "") {
                    teinteInput.style.border = "2px solid red";
                    valid = false;
                }
            }

            if (element.querySelector('.teinte')) {
                if (document.getElementById('client').value !== "" && article !== "" && conditionnement !== "" && quantite !== "" && teinte !== "") {
                    valid = true;
                }
            } else {
                if (document.getElementById('client').value !== "" && article !== "" && conditionnement !== "" && quantite !== "") {
                    valid = true;
                }
            }

        });

        return valid;
    }
}


function formatParams(params) {
    return "?" + Object.keys(params).map((key) => {
        return key+"="+encodeURIComponent(params[key])
    }).join("&");
}


/**
* submit
* Envoi le formulaire si tout est ok
* Redirige ensuite vers la page d'accueil si ok
* @param {Object} event 
*/
function send(event) {
    event.preventDefault();

    var node = document.querySelectorAll('.add');
    let articles = [];
    let client = [];


    var res = this.formValid();

    if (res) {

        client = {
            nom: document.getElementById('client').value,
            adresse: document.getElementById('label-ad').innerHTML,
            code_client: document.getElementById('label-cc').innerHTML,
            code_postal: document.getElementById('label-cp').innerHTML,
            ville: document.getElementById('label-vl').innerHTML
        }
        var arr = [].slice.call(node);

        arr.forEach((element, key) => {
            var article = element.querySelector('.article').value;
            var article_libelle = element.querySelector('.libelle').value;
            var conditionnement = element.querySelector('.conditionnement').value;
            var quantite = element.querySelector('.quantite').value;
            var teinte = "";
            if (element.querySelector('.teinte')) {
                teinte = element.querySelector('.teinte').value;
            }
            var prix = element.querySelector('.prix').value;
            var nombre_unite = element.querySelector('.nombre_unite').value;

            if (article !== "" && conditionnement !== "" && quantite !== "") {
                articles.push(key);
                articles[key] = {
                    code_article: article,
                    conditionnement: conditionnement,
                    quantite: quantite,
                    teinte: teinte,
                    libelle_article: article_libelle,
                    prix: prix,
                    nombre_unite: nombre_unite
                }
            }
        });

        var xhr = new XMLHttpRequest();
        var params = {
            article: articles,
            client: client,
            commentaire: document.getElementById('commentaire').value,
        }

        xhr.open('POST', 'http://localhost:3000/send')
        xhr.setRequestHeader("Content-Type", "application/json");

        xhr.addEventListener('readystatechange', () => {
            if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
                window.location.replace('http://localhost:3000');
            }
        })

        xhr.send(JSON.stringify(params));
    }
}