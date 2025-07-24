export interface LoginRequest {
    username: string;
    password: string;
    rememberMe?: boolean;
}

export interface LoginResponse {
    token: string;
    user: {
        id: string;
        username: string;
        email: string;
        role: string;
    };
    refreshToken?: string;
    expiresIn?: number;
}