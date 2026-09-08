import { useState } from 'react';
import { submitContactForm } from '../services/contactService';

export function useContactForm(defaultContext: string = 'General Engagement') {
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactMsg, setContactMsg] = useState('');
  const [contactLoading, setContactLoading] = useState(false);
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [contactError, setContactError] = useState<string | null>(null);

  const handleContactSubmit = async (e: React.FormEvent, customContext?: string) => {
    e.preventDefault();
    if (!contactName.trim() || !contactEmail.trim() || !contactMsg.trim()) return;

    setContactLoading(true);
    setContactError(null);

    const res = await submitContactForm({
      name: contactName.trim(),
      email: contactEmail.trim(),
      message: contactMsg.trim(),
      serviceContext: customContext || defaultContext
    });

    setContactLoading(false);
    if (res.success) {
      setContactSubmitted(true);
      setTimeout(() => {
        setContactSubmitted(false);
        setContactName('');
        setContactEmail('');
        setContactMsg('');
      }, 6000);
    } else {
      setContactError(res.error || 'Failed to submit engagement request.');
    }
  };

  return {
    contactName,
    setContactName,
    contactEmail,
    setContactEmail,
    contactMsg,
    setContactMsg,
    contactLoading,
    contactSubmitted,
    contactError,
    handleContactSubmit
  };
}
