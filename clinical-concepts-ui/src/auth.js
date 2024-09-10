// auth.js
import * as jwtDecode from 'jwt-decode';  // Ensure jwt-decode is installed

// Function to handle Cognito login redirection
export const redirectToCognitoLogin = () => {
    const cognitoDomain = "https://clinical-concepts-auth.auth.us-east-2.amazoncognito.com/login";
    const clientId = "7eg5i6h0vje37s2o6r5okua7"; // Your Cognito App Client ID
    const redirectUri = window.location.origin; // Redirect back to the same page after login
    const responseType = "token";
    const scope = "openid+profile+email"; // Scope might differ based on what you need
    const loginUrl = `${cognitoDomain}?client_id=${clientId}&response_type=${responseType}&scope=${scope}&redirect_uri=${redirectUri}`;
    window.location.href = loginUrl;
};

// Function to extract the token from the URL
export const getTokenFromUrl = () => {
    const hash = window.location.hash.substr(1);
    const result = hash.split('&').reduce((res, item) => {
        const parts = item.split('=');
        res[parts[0]] = parts[1];
        return res;
    }, {});
    return result.access_token;
};

// Function to decode the token and retrieve user group
export const getUserGroupFromToken = (token) => {
    if (!token) return null;
    const decodedToken = jwtDecode(token);
    const groups = decodedToken["cognito:groups"] || [];
    return groups.includes("admin") ? "admin" : groups.includes("viewer") ? "viewer" : null;
};
