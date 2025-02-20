document.getElementById('converter-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const amount = document.getElementById('amount').value;
    const fromCurrency = document.getElementById('from-currency').value;
    const toCurrency = document.getElementById('to-currency').value;
    const resultElement = document.getElementById('result');

    resultElement.classList.add('converting');
    resultElement.textContent = 'Converting...';

    try {
        const fetchPromise = fetch(`https://open.er-api.com/v6/latest/${fromCurrency}`).then(response => response.json());
        const delayPromise = new Promise(resolve => setTimeout(resolve, 500));
        const [data] = await Promise.all([fetchPromise, delayPromise]);
        
        if (data.result === 'success') {
            const rate = data.rates[toCurrency];
            const convertedAmount = (amount * rate).toFixed(2);
            const lastUpdated = new Date(data.time_last_update_unix * 1000).toLocaleString('en-US', {
                dateStyle: 'medium',
                timeStyle: 'short'
            });
            resultElement.innerHTML = `${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency}<sup>*</sup>`;
            resultElement.setAttribute('data-footnote', `Last updated: ${lastUpdated}`);
        } else {
            resultElement.textContent = 'Error fetching exchange rates.';
        }
    } catch (error) {
        resultElement.textContent = 'Something went wrong. Please try again.';
    }
    resultElement.classList.remove('converting');
});