# Email Subscription Form

A modern email subscription form built with React, TypeScript, TailwindCSS, and EmailJS for real email sending.

## Features

- ✅ Responsive design with TailwindCSS
- ✅ Email validation
- ✅ Loading states and error handling
- ✅ Success confirmation
- ✅ TypeScript support
- ✅ Real email sending with EmailJS
- ✅ Environment variable configuration

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Set up EmailJS:
   - Create an account at [EmailJS](https://www.emailjs.com/)
   - Create an email service (Gmail, Outlook, etc.)
   - Create an email template
   - Get your Service ID, Template ID, and Public Key

3. Configure environment variables:
   - Copy `env.example` to `.env`
   - Fill in your EmailJS credentials:
```bash
cp env.example .env
```

4. Start the development server:
```bash
npm start
```

5. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## EmailJS Setup

### 1. Create EmailJS Account
- Go to [EmailJS](https://www.emailjs.com/) and sign up
- Verify your email address

### 2. Add Email Service
- Go to "Email Services" in your dashboard
- Click "Add New Service"
- Choose your email provider (Gmail, Outlook, etc.)
- Follow the setup instructions for your provider

### 3. Create Email Template
- Go to "Email Templates" in your dashboard
- Click "Create New Template"
- Use this template structure:
```
Subject: New Newsletter Subscription

From: {{from_name}}
Email: {{to_email}}

Message: {{message}}

Reply to: {{reply_to}}
```

### 4. Get Your Credentials
- Service ID: Found in "Email Services" section
- Template ID: Found in "Email Templates" section  
- Public Key: Found in "Account" section under "API Keys"

### 5. Environment Variables
Create a `.env` file in the root directory:
```env
REACT_APP_EMAILJS_SERVICE_ID=your_service_id_here
REACT_APP_EMAILJS_TEMPLATE_ID=your_template_id_here
REACT_APP_EMAILJS_PUBLIC_KEY=your_public_key_here
```

## Project Structure

```
src/
├── components/
│   └── EmailSubscriptionForm.tsx  # Main form component
├── App.tsx                        # Main app component
├── App.css                        # TailwindCSS imports
├── index.tsx                      # React entry point
└── index.css                      # Global styles
```

## Technologies Used

- React 18
- TypeScript
- TailwindCSS
- EmailJS
- Environment Variables

## Troubleshooting

### EmailJS Issues
- Make sure your environment variables are correctly set
- Verify your EmailJS service is active
- Check that your email template uses the correct variable names
- Ensure your email service provider is properly configured

### Common Errors
- "Invalid service ID": Check your REACT_APP_EMAILJS_SERVICE_ID
- "Invalid template ID": Check your REACT_APP_EMAILJS_TEMPLATE_ID  
- "Invalid public key": Check your REACT_APP_EMAILJS_PUBLIC_KEY
- "Email service not found": Make sure your email service is active in EmailJS dashboard
