<script>
    import { onMount } from 'svelte';

    let amount = 1;
    let fromCurrency = 'USD';
    let toCurrency = 'RUB';
    let convertedAmount = 0;

    let exchangeRate = 0;

    async function fetchExchangeRate() {
        const url = `https://api.exchangerate-api.com/v4/latest/${fromCurrency}`;
        try {
            const response = await fetch(url);
            if (!response.ok) {
            throw new Error('Network response was not ok');
            }
            const data = await response.json();
            exchangeRate = data.rates[toCurrency];
            updateConvertedAmount();
        } catch (error) {
            console.error('Error fetching exchange rate:', error);
        }
    }

    onMount(fetchExchangeRate);

    async function updateExchangeRate() {
        try {
            await fetchExchangeRate()
        } catch (error) {
            console.error('Error updating exchange rate:', error);
        }
    }

    

    function updateConvertedAmount() {
    convertedAmount = amount * exchangeRate;
}

    function updateAmount() {
    // Пересчитываем сумму на основе значения второго инпута
    // Здесь нужно учитывать курс обмена
     const calculatedAmount = convertedAmount / exchangeRate;
     amount = Number(calculatedAmount.toFixed(3))
}

</script>
<h1>Конвертация валют</h1>
<div class="container">
  <div class="currency-converter">
    <div class="input-section">
      <input
        type="number"
        id="amount"
        bind:value={amount}
        on:input={updateConvertedAmount}
      />
      <select
        id="from-currency"
        bind:value={fromCurrency}
        on:change={updateExchangeRate}
      >
        <option value="RUB">RUB</option>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="GBP">GBP</option>
      </select>
    </div>
    <div class="output-section">
      <input
        type="number"
        id="converted-amount"
        bind:value={convertedAmount}
        on:input={updateAmount}
      />
      <select
        id="to-currency"
        bind:value={toCurrency}
        on:change={updateExchangeRate}
      >
        <option value="RUB">RUB</option>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="GBP">GBP</option>
      </select>
    </div>
  </div>
</div>

<style>
    h1 {
        font-size: 80px;
    }
  .container {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .currency-converter {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .input-section,
  .output-section {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
  }

  input {
    font-size: 45px;
    width: 300px;
    text-align: right;
    padding: 5px;
    margin-right: 5px;
  }

  select {
    padding: 5px;
    font-size: 45px;
  }
</style>
