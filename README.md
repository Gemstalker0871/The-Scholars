# Coin toss

> A simple demonstration of integrating react with contracts written in soroban

## Running locally

- Clone repository
```
git clone https://github.com/kshitijv256/coin_toss.git
```
- Install dependencies
```
npm install
```
- Run development server
```
npm run dev
```
- Provide authrizatiob for ssl certificate if asked.


## Steps to create from scratch

- Create contract with soroban cli.
- Deploy your contracts and add details to deployments.json.
- Initiate react app *preferably with vite*.
- Create a provider for soroban client as `MySorobanReactProvider,tsx` and wrap your app in it.
- Add wallet integration as shown in `ConnectButton.tsx`.
- Fetch contract from provider with `useRegisteredContract` hook provided with @soroban-react/contracts.
- Invoke contracts as needed like any other method, passing correct argumnets.
