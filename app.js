document.addEventListener('DOMContentLoaded', async () => {
    const fromCurrency = document.getElementById ('fromCurrency');
    const toCurrency = document.getElementById ('toCurrency');

    const response = await fetch ('https://api.frankfurter.app/currencies');

    const currencies = await response.json();

    for (const [code, name] of Object.entries(currencies)) {
        const optionFrom = document.createElement('option');
        optionFrom.value = code;
        optionFrom.textContent = `${name} (${code})`;
        fromCurrency.appendChild(optionFrom);


        const optionTo = document.createElement('option');
        optionTo.value = code;
        optionTo.textContent = `${name} (${code})`;
        toCurrency.appendChild(optionTo);
    } 
});

async function convertCurrency() { 
    const amount = document.getElementById('amount').value;
    const fromCurrency = document.getElementById('fromCurrency').value;
    const toCurrency = document.getElementById('toCurrency').value;

    if (amount === "" || isNaN(amount)){
        alert("Por favor ingresa una cantidad a convertir");
        return;
    }

    if (fromCurrency === toCurrency){
        document.getElementById('result').innerText = `${amount} ${fromCurrency} equals ${amount} ${toCurrency}`;
        return;


    }

    const response = await fetch (`https://api.frankfurter.app/latest?amount=${amount}&from{fromCurrency}to {toCurrency}`);
    const data = await response.json();
    const result = data.rates[toCurrency];

    document.getElementById('result').innerText = `${amount} ${fromCurrency} equals ${result} ${toCurrency}`;


}



