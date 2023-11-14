const { createExchange, WebsocketClient } = require('@compendiumfi/pendax');
require('dotenv').config();

// Initialize the OKX exchange object using PENDAX SDK
let myOkxAccount = createExchange({
    exchange: "okx",
    authenticate: true,
    key: process.env.OKX_API_KEY,
    secret: process.env.OKX_API_SECRET,
    passphrase: process.env.OKX_PASSPHRASE,
    label: "okx",
    marginType: "usdt"
});

// Initialize WebSocket Client for OKX
const wsClient = new WebsocketClient({
    exchange: 'okx',
    key: process.env.OKX_API_KEY,
    secret: process.env.OKX_API_SECRET,
    passphrase: process.env.OKX_PASSPHRASE,
});

// Currency pairs for triangular arbitrage - configurable
const currencyPairs = ['ETH-BTC', 'ETH-USDT', 'BTC-USDT'];
const MIN_PROFIT_THRESHOLD = 0.001; // Example: 0.1%
let marketPrices = {}; // Store for latest market prices

// WebSocket message handler
wsClient.on('message', data => {
    if (data.event === 'update' && data.channel === 'tickers') {
        updateMarketPrices(data.data);
        const profit = calculateProfit();
        if (profit > MIN_PROFIT_THRESHOLD) {
            executeArbitrageTrades();
        }
    }
});

// Update market prices based on WebSocket data
function updateMarketPrices(tickerData) {
    tickerData.forEach(ticker => {
        marketPrices[ticker.instId] = parseFloat(ticker.last); // Assuming 'last' represents the last traded price
    });
}

// Calculate potential profit from triangular arbitrage
function calculateProfit() {
    if (!marketPrices['ETH-BTC'] || !marketPrices['ETH-USDT'] || !marketPrices['BTC-USDT']) {
        return 0;
    }

    // Example logic for a BTC -> ETH -> USDT -> BTC cycle
    const startAmountBTC = 1; // Starting with 1 BTC
    const btcToEth = startAmountBTC / marketPrices['ETH-BTC'];
    const ethToUsdt = btcToEth * marketPrices['ETH-USDT'];
    const usdtToBtc = ethToUsdt / marketPrices['BTC-USDT'];

    return usdtToBtc - startAmountBTC; // Profit in BTC
}

// Execute triangular arbitrage trades
async function executeArbitrageTrades() {
    try {
        const startAmountBTC = 1;
        const btcToEthSize = startAmountBTC / marketPrices['ETH-BTC'];
        const ethToUsdtSize = btcToEthSize * marketPrices['ETH-USDT'];
        const usdtToBtcSize = ethToUsdtSize / marketPrices['BTC-USDT'];

        // 1. Buy ETH with BTC
        await myOkxAccount.placeOrder({
            instId: 'ETH-BTC',
            tdMode: 'cash',
            side: 'buy',
            ordType: 'market',
            sz: btcToEthSize.toString()
        });

        // 2. Sell ETH for USDT
        await myOkxAccount.placeOrder({
            instId: 'ETH-USDT',
            tdMode: 'cash',
            side: 'sell',
            ordType: 'market',
            sz: ethToUsdtSize.toString()
        });

        // 3. Buy BTC with USDT
        await myOkxAccount.placeOrder({
            instId: 'BTC-USDT',
            tdMode: 'cash',
            side: 'buy',
            ordType: 'market',
            sz: usdtToBtcSize.toString()
        });

        console.log("Arbitrage trades executed successfully");
    } catch (error) {
        console.error(`Trade Execution Error: ${error.message}`);
    }
}

// Connect WebSocket Client and subscribe to currency pairs
wsClient.connect();
wsClient.subscribeToTickers(currencyPairs);