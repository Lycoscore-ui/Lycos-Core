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
  const endpoints = ['/api/contact.php', '/contact.php', '/api/contact'];
  let lastError = '';

  for (const endpoint of endpoints) {
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      const contentType = response.headers.get('content-type') || '';
      if (!contentType.includes('application/json')) {
        const text = await response.text();
        if (text.startsWith('<!doctype') || text.startsWith('<html')) {
          continue; // Try next endpoint
        }
        try {
          const parsed = JSON.parse(text);
          if (parsed.success) return { success: true, message: parsed.message };
          return { success: false, error: parsed.error || 'Server rejected inquiry.' };
        } catch {
          continue;
        }
      }

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
      lastError = err?.message || 'Network error';
    }
  }

  return {
    success: false,
    error: lastError || 'Unable to contact mail dispatch server. Please try again shortly.'
  };
}
