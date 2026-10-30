import type { PublicUser } from "../../domain/user/entity";

//создаем интерфейс для данных аудентификации и регистр
export interface AuthInput {
    //вмещает имейл и пароль
    email: string , 
    password: string
}

//интерфейс для хеша пароля
export interface PasswordHasher {
    //вмещает функции хеша и проверки пароля
    hash(password: string): Promise<string> , 
    verify(password: string, hash: string):  Promise<boolean>
}

//интерфейс для подписи токенов
export interface TokenSign {
    //вмещает функции для создания токенов
    signAccessToken(userId: number): string
    signRefreshToken(userId: number): string
}

//интерфейс для верификации токенов
export interface TokenVerify{
    //вмещает функц для верификации
    verifyRefreshToken(token: string): number
}

//интерфейс для токенов послк аудентификации
export interface AuthTokens{
    accessToken: string
    refreshToken: string
}

//интерфейс для сервиса аудентификации и регистр
export interface AuthService {
    //вмещает все методы  которые реализтвать нужно сервису которые прописывали в auth ts
    //регистрацию , логин, обновление токена и получение инфы про юзера
    register(input: AuthInput): Promise<PublicUser> 
    login(input: AuthInput): Promise<{user: PublicUser} & AuthTokens>
    refresh(refreshToken: string): Promise<AuthTokens>
    me(userId: number): Promise<PublicUser>
}