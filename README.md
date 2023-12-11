## Simple Payment Using Express JS and Midtrans Payment Gateway

Transaction payment with Midtrans and integrate with database

## Features

- Create sync transaction from database to **midtrans**
- Checking status transaction with **cronjob** _(for local environment)_
- Provide endpoint notification to receive data payment from **midtrans** _(for production environment)_

## Get Started

### Start with

```
npm install
```

Copy the env files

```
cp .env.example .env
```

- change DATABASE_URL to your database connection
- change SECRET for your salt password
- change ENABLE_CRON to on/off cronjob feature
- change INTERVAL_INQUIRY to setting interval cronjob execute
- change MIDTRANS_SECRET_KEY to your midtrans secret key

## Migrate database

```
npx prisma migrate dev
```

## Documentation

- **Create Transaction** **[POST]** _/transaction/buy_

```
{
  "product_id": 1,
  "user_id": 1
}
```

- **Receive Notification From Midtrans** **[POST]** _/transaction/notifications_

```
{
  "order_id": "ORDER-ID-123"
}
```

- **Get Last 24 Hours Data Payment With Transaction Status Not Equal "settlement" and "expired"** **[POST]** _/transaction/lastday_
