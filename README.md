# Triangular Arbitrage Bot for OKX

**PLEASE NOTE THAT THIS CODE IS UNDER CONSTRUCTION AND DOES NOT CURRENTLY FUNCTION!**

## Overview
This Node.js-based bot is designed to execute a triangular arbitrage strategy on the OKX cryptocurrency exchange. Triangular arbitrage is a trading strategy that takes advantage of price discrepancies between three different currencies in the same market. In this bot, the strategy involves trading sequences like BTC to ETH, ETH to USDT, and USDT back to BTC, aiming to exploit inefficiencies in the market prices of these currency pairs. This was built as an educational excercise utilizing the PENDAX SDK from Compendium.

## Getting Started

### Prerequisites
- Node.js
- npm (Node.js package manager)
- Docker (optional, for containerized deployment)
- Git (for cloning the repository)

### Setting Up

1. **Clone the Repository**:  
Use git clone ability to clone this repository.

2. **Install Dependencies**:  
Run `npm install` to install the necessary Node.js packages.

3. **Obtain OKX API Keys**:
- Sign in to your OKX account.
- Navigate to the API section and create a new API key.
- Make sure to keep your API key and secret safe and secure.

4. **Configure Environment Variables**:
- Create a `.env` file in the root directory of the project.
- Add your OKX API keys to the `.env` file:
  ```
  OKX_API_KEY=your_okx_api_key
  OKX_API_SECRET=your_okx_api_secret
  OKX_PASSPHRASE=your_okx_passphrase
  ```
- Ensure that this `.env` file is included in your `.gitignore` for security.

5. **Running the Bot Locally**:
- Start the bot using Node.js:
  ```
  node arbitrageBot.js
  ```

### Setting Up with Docker

1. **Build the Docker Image**:  
docker build -t arbitrage-bot .

2. **Run the Docker Container**:  
docker run --env-file your_env_file_path -p 3000:3000 -d arbitrage-bot

Replace `your_env_file_path` with the actual path to your `.env` file.

3. **Using Docker Compose** (optional):  
If you have a `docker-compose.yml` file, simply run:
docker-compose up -d


## Contributing

Contributions to improve the bot are welcome. Please ensure to follow the standard procedures for contributing to this repository.

## License

This project is licensed under the [MIT License](LICENSE).

## Disclaimer

This bot is for educational and research purposes only. Please ensure that you understand the risks involved in automated trading and use it at your own risk. The creators are not responsible for any financial losses incurred.
