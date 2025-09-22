import React, { useState } from 'react';
import emailjs from '@emailjs/browser';

interface FormData {
  email: string;
}

interface FormState {
  isLoading: boolean;
  isSubmitted: boolean;
  error: string | null;
}

const EmailSubscriptionForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({ email: '' });
  const [formState, setFormState] = useState<FormState>({
    isLoading: false,
    isSubmitted: false,
    error: null
  });

  // EmailJS configuration - Replace these with your actual values
  const EMAILJS_SERVICE_ID = process.env.REACT_APP_EMAILJS_SERVICE_ID || 'service_qha2pqh';
  const EMAILJS_TEMPLATE_ID = process.env.REACT_APP_EMAILJS_TEMPLATE_ID || 'template_2omrtbs';
  const EMAILJS_PUBLIC_KEY = process.env.REACT_APP_EMAILJS_PUBLIC_KEY || 'XSArlkEJ9HQzbR3Tc';

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setFormData({ email: value });
    // Clear error when user starts typing
    if (formState.error) {
      setFormState(prev => ({ ...prev, error: null }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Validate email
    if (!formData.email.trim()) {
      setFormState(prev => ({ ...prev, error: 'Email is required' }));
      return;
    }
    
    if (!validateEmail(formData.email)) {
      setFormState(prev => ({ ...prev, error: 'Please enter a valid email address' }));
      return;
    }

    setFormState(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      // Initialize EmailJS with your public key
      emailjs.init(EMAILJS_PUBLIC_KEY);

      // Prepare template parameters
      const templateParams = {
        to_email: formData.email, // Email to send to
        from_name: 'Newsletter Subscription',
        message: `New subscription request from: ${formData.email}`,
        reply_to: formData.email,
      };

      // Send email using EmailJS
      const response = await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams
      );

      console.log('Email sent successfully:', response);
      
      setFormState({
        isLoading: false,
        isSubmitted: true,
        error: null
      });
      
      // Reset form
      setFormData({ email: '' });
      
    } catch (error) {
      console.error('Email sending error:', error);
      setFormState(prev => ({
        ...prev,
        isLoading: false,
        error: 'Failed to send email. Please try again later.'
      }));
    }
  };

  if (formState.isSubmitted) {
    return (
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
            <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Successfully Subscribed!</h3>
          <p className="text-gray-600 mb-4">
            Thank you for subscribing! You'll receive our latest updates.
          </p>
          <button
            onClick={() => setFormState(prev => ({ ...prev, isSubmitted: false }))}
            className="text-blue-600 hover:text-blue-500 font-medium"
          >
            Subscribe another email
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Stay Updated</h2>
        <p className="text-gray-600">
          Subscribe to our newsletter for the latest news and updates.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Enter your email address"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            disabled={formState.isLoading}
          />
        </div>

        {formState.error && (
          <div className="bg-red-50 border border-red-200 rounded-md p-3">
            <p className="text-sm text-red-600">{formState.error}</p>
          </div>
        )}

        <button
          type="submit"
          disabled={formState.isLoading}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {formState.isLoading ? (
            <div className="flex items-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Subscribing...
            </div>
          ) : (
            'Subscribe'
          )}
        </button>
      </form>
    </div>
  );
};

export default EmailSubscriptionForm;
