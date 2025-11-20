const modalTransaction = new bootstrap.Modal('#transaction-modal');
let logged = sessionStorage.getItem('logged');
const session = localStorage.getItem('session');

let data = {
    transactions: []
};


//LOGOUT
document.getElementById('logout-button').addEventListener('click', function () {
    logout();
});

function logout() {
    sessionStorage.removeItem('logged');
    localStorage.removeItem('session');

    window.location.href = 'index.html';
}

//VERIFICAR SE ESTÁ LOGADO
checkLogged();

function checkLogged() {
    if (session) {
        sessionStorage.setItem('logged', session);
        logged = session;
    }

    if (!logged) {
        window.location.href = 'index.html';
        return;
    }
    const dataUser = localStorage.getItem(logged);
    if (dataUser) {
        data = JSON.parse(dataUser);
    }

    getCashIn();
    getCashOut();
    getTotal();
}

//SALVAR DADOS NO LOCALSTORAGE
function saveData(data) {
    localStorage.setItem(data.email, JSON.stringify(data));
}

//NAVEGAR PARA LANÇAMENTO
document.getElementById('transactions-button').addEventListener('click', function () {
    window.location.href = 'transactions.html';
});

//ADICIONAR LANÇAMENTO
document.getElementById('transaction-form').addEventListener('submit', function (e) {
    e.preventDefault();
    const value = parseFloat(document.getElementById('value-input').value);
    const type = document.querySelector('input[name="type-input"]:checked').value;
    const description = document.getElementById('description-input').value;
    const date = document.getElementById('date-input').value;

    data.transactions.unshift({
        value: value,
        type: type,
        description: description,
        date: date
    });

    saveData(data);
    e.target.reset();
    modalTransaction.hide();

    getCashIn();
    getCashOut();
    getTotal();

    alert('Lançamento adicionado com sucesso!');
});

function getCashIn() {
    const transactions = data.transactions;

    const cashIn = transactions.filter((item) => item.type === '1');

    if (cashIn.length) {
        let cashInHtml = '';
        let limit = 0;

        if (cashIn.length > 5) {
            limit = 5;
        } else {
            limit = cashIn.length;
        }

        for (let i = 0; i < limit; i++) {
            cashInHtml += `
        <div class="row mb-4">
            <div class="col-12">
                <h3 class="fs-2">R$ ${cashIn[i].value.toFixed(2)}</h3>
                    <div class="container p-0">
                        <div class="row">
                            <div class="col-12 col-md-8">
                                <p>${cashIn[i].description}</p>
                            </div>
                            <div class="col-12 col-md-3 d-flex justify-content-end">
                                <p>${cashIn[i].date}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        `;
        }

        document.getElementById("cash-in-list").innerHTML = cashInHtml;
    }
}

function getCashOut() {
    const transactions = data.transactions;
    const cashOut = transactions.filter((item) => item.type === '2');

    if (cashOut.length) {
        let cashOutHtml = '';
        let limit = 0;

        if (cashOut.length > 5) {
            limit = 5;
        } else {
            limit = cashOut.length;
        }

        for (let i = 0; i < limit; i++) {
            cashOutHtml += `
        <div class="row mb-4">
            <div class="col-12">
                <h3 class="fs-2">R$ ${cashOut[i].value.toFixed(2)}</h3>
                    <div class="container p-0">
                        <div class="row">
                            <div class="col-12 col-md-8">
                                <p>${cashOut[i].description}</p>
                            </div>
                            <div class="col-12 col-md-3 d-flex justify-content-end">
                                <p>${cashOut[i].date}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        `;
        }

        document.getElementById("cash-out-list").innerHTML = cashOutHtml;
    }
}

function getTotal(){
    const transactions = data.transactions;
    let totalIn = 0;
    let totalOut = 0;
    
    transactions.forEach((item) => {
        if(item.type === '1') {
            totalIn += item.value;
        } else {
            totalOut += item.value;
        }
    });

    const total = totalIn - totalOut;
    document.getElementById("total").innerText = `R$ ${total.toFixed(2)}`;
}

// Set max date to today
const dateInput = document.getElementById('date-input');
const today = new Date().toISOString().split('T')[0];
dateInput.setAttribute('max', today);