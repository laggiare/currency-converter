document.getElementById('converter-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const amount = document.getElementById('amount').value;
    const fromCurrency = document.getElementById('from-currency').value;
    const toCurrency = document.getElementById('to-currency').value;
    const resultElement = document.getElementById('result');

    resultElement.classList.add('converting');
    resultElement.textContent = 'Converting...';

    try {
        // Start the API fetch
        const fetchPromise = fetch(`https://open.er-api.com/v6/latest/${fromCurrency}`).then(response => response.json());
        // Ensure spinner shows for at least 500ms
        const delayPromise = new Promise(resolve => setTimeout(resolve, 500));
        
        // Wait for both the fetch and the minimum delay to complete
        const [data] = await Promise.all([fetchPromise, delayPromise]);
        
        if (data.result === 'success') {
            const rate = data.rates[toCurrency];
            const convertedAmount = (amount * rate).toFixed(2);
            resultElement.textContent = `${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency}`;
        } else {
            resultElement.textContent = 'Error fetching exchange rates.';
        }
    } catch (error) {
        resultElement.textContent = 'Something went wrong. Please try again.';
    }
    resultElement.classList.remove('converting');
});