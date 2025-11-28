// This file helps with OAuth URL configuration on Replit

export function getOAuthCallbackURL(req?: any): string {
  // For relative paths, Passport will use the request's protocol and host
  return "/auth/google/callback";
}

export function getFullOAuthURL(host: string, protocol: string = "https"): string {
  return `${protocol}://${host}/auth/google/callback`;
}
