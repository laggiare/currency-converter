document.getElementById('converter-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    console.log('Form submitted'); // Check if the event fires

    const amount = document.getElementById('amount').value;
    const fromCurrency = document.getElementById('from-currency').value;
    const toCurrency = document.getElementById('to-currency').value;
    const resultElement = document.getElementById('result');
    console.log('Inputs:', amount, fromCurrency, toCurrency); // Verify input values

    try {
        console.log('Fetching from:', `https://open.er-api.com/v6/latest/${fromCurrency}`);
        const response = await fetch(`https://open.er-api.com/v6/latest/${fromCurrency}`);
        const data = await response.json();
        console.log('API response:', data); // See what the API returns

        if (data.result === 'success') {
            const rate = data.rates[toCurrency];
            console.log('Rate:', rate); // Check the rate
            const convertedAmount = (amount * rate).toFixed(2);
            resultElement.textContent = `${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency}`;
        } else {
            resultElement.textContent = 'Error fetching exchange rates.';
        }
    } catch (error) {
        resultElement.textContent = 'Something went wrong. Please try again.';
        console.error('Error:', error); // Log the error details
    }
});