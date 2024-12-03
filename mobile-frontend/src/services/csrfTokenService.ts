import AsyncStorage from '@react-native-async-storage/async-storage';
import Config from "react-native-config";

const apiBaseUrl = Config.REACT_APP_API_BASE_URL;
export const fetchCsrfToken = async (): Promise<void> => {
    try {
        const response = await fetch(`IPADDRESS:8000/api/csrf/restore`, {
            credentials: 'include', // Ensure cookies are included in the request
        });
        const data = await response.json();
        if (data.csrfToken) {
            await AsyncStorage.setItem('csrfToken', data.csrfToken);
        } else {
            throw new Error('CSRF token not found in response');
        }
    } catch (error) {
        console.error('Failed to fetch CSRF token', error);
    }
};

export const getCsrfToken = async (): Promise<string | null> => {
    try {
        return await AsyncStorage.getItem('csrfToken');
    } catch (error) {
        console.error('Failed to fetch CSRF token from AsyncStorage', error);
        return null;
    }
};


