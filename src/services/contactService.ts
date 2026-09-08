export interface ContactPayload {
  name: string;
  email: string;
  message: string;
  serviceContext?: string;
  company?: string;
  phone?: string;
}

export interface ContactResponse {
  success: boolean;
  message?: string;
  error?: string;
}

export async function submitContactForm(payload: ContactPayload): Promise<ContactResponse> {
  try {
    const response = await fetch('/api/contact.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    const data = await response.json();
    if (!response.ok || !data.success) {
      return {
        success: false,
        error: data.error || 'Failed to transmit request. Please verify your connection or try again shortly.'
      };
    }

    return {
      success: true,
      message: data.message || 'Inquiry successfully transmitted.'
    };
  } catch (err: any) {
    return {
      success: false,
      error: err?.message || 'Network error while contacting mail gateway.'
    };
  }
}
