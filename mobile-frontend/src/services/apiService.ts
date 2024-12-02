// Define a more flexible ApiResponse type
import {getCsrfToken} from "./csrfTokenService";

interface CreateSetupIntentResponse {
    clientSecret: string;
}

export const apiRequest = async (url: string, options: RequestInit = {}): Promise<CreateSetupIntentResponse | null> => {
    try {
        const csrfToken = await getCsrfToken();

        // Add CSRF token to headers if it's available
        const headers = new Headers(options.headers);
        if (csrfToken) {
            headers.append('X-XSRF-TOKEN', csrfToken);
        }

        const response = await fetch(url, {
            ...options,
            headers,
        });

        const data = await response.json();
        return data; // Return the response data (which should include clientSecret)
    } catch (error) {
        console.error('API request failed', error);
        return null;
    }
};
