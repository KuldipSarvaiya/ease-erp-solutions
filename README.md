## Setting Up Env Variable

```bash
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=http://localhost:3000  # changed in production
MONGODB_URL=your_mongodb_connection_string
RZP_KEY=key_of_your_razorpay_account
RZP_SECRET=secret_of_your_razorpay_account
RZP_CUSTOMER_ID=customer-id_of_your_razorpay_account  # changed in production
MAIL_USER=your_email_of_gmail_servise
CLIENT_ID=client_id_of_gmail_service_google_cloud_gmail_api
CLIENT_SECRET=client_secret_of_gmail_service_google_cloud_gmail_api
REDIRECT_URI=https://developers.google.com/oauthplayground
REFRESH_TOKEN=get_it_from_https://developers.google.com/oauthplayground_with_id,secret_of_Gmail_API
```

## Getting Started

First, install the dependencies

```bash
npm install 
```

To run the development server:

```bash
npm run dev 
```

To  build and start a production-like environment:

```bash
npm run build
```

Then,

```bash
npm run start
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.