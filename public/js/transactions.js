const modalTransaction = new bootstrap.Modal('#transaction-modal');
let logged = sessionStorage.getItem('logged');
const session = localStorage.getItem('session');

let data = {
    transactions: []
};

//LOGIN LOGOUT
document.getElementById('logout-button').addEventListener('click', function () {
    logout();
});

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

    getTransactions();
}

function logout() {
    sessionStorage.removeItem('logged');
    localStorage.removeItem('session');

    window.location.href = 'index.html';
}

function saveData(data) {
    localStorage.setItem(data.email, JSON.stringify(data));
}

//TRANSACTION FORM
document.getElementById('transaction-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const id = data.transactions.length + 1;
    const value = parseFloat(document.getElementById('value-input').value);
    const type = document.querySelector('input[name="type-input"]:checked').value;
    const description = document.getElementById('description-input').value;
    const date = document.getElementById('date-input').value;

    data.transactions.unshift({
        id: id,
        value: value,
        type: type,
        description: description,
        date: date
    });

    saveData(data);
    e.target.reset();
    modalTransaction.hide();

    getTransactions();

    alert('Lançamento adicionado com sucesso!');
});

function getTransactions() {
    const transactions = data.transactions;
    let transactionsHTML = '';

    if (transactions.length) {
        transactions.forEach((item) => {
            let type = 'Entrada';

            if (item.type === '2') {
                type = 'Saída';
            }

            transactionsHTML += `
            <tr>
                <th scope="row">${item.date}</th>
                <td>${item.value.toFixed(2)}</td>
                <td>${type}</td>
                <td>${item.description}</td>
                <td><button class="btn" onclick="deleteTransaction(${item.id})"><i class="bi bi-trash"></i></button></td>
            </tr>
            `;
        });
        document.getElementById('transactions-list').innerHTML = transactionsHTML;
    }
}

function deleteTransaction(id) {
    const confirmation = confirm('Tem certeza que deseja deletar este lançamento?');
    if (confirmation) {
        const index = data.transactions.findIndex(transaction => transaction.id === id);
        if (index > -1) {
            data.transactions.splice(index, 1);
            saveData(data);
            getTransactions();
            alert('Lançamento deletado com sucesso!');
        }
    }
}