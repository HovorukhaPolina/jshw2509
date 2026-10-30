import "dotenv/config"
import jwt from "jsonwebtoken";

//получаем секретные ключи из переменных окружения
const accessSecret = process.env.JWT_ACCESS_SECRET;
const refreshSecret = process.env.JWT_REFRESH_SECRET;
//условия где говорим что если ключи не определены то выкидываем ошибку
if (!accessSecret) throw new Error("JWT_ACCESS_SECRET is not defined");
if (!refreshSecret) throw new Error("JWT_REFRESH_SECRET is not defined");

//функция для подписи токена доступа и вмещает только юзер айди
export function signAccessToken(userId: number): string {
  //тут говорим что токен вмещает алгоритм , субьект юзера айди и срок действия
  return jwt.sign({}, accessSecret!, {
    algorithm: "HS256",          
    subject: String(userId),     
    expiresIn: "15m",            
  });
}

//функция для подписи токена обновления и вмещает тоже только юзер айди
export function signRefreshToken(userId: number): string {
  //так же само тут говорим что токен вмещает алгоритм , субьект юзера айди и срок действия только у него уже срок больше
  //и еще говорим что у токена тип refresh чтоб нелтзя было исп как токен доступа
  return jwt.sign({type: "refresh"}, refreshSecret!, {
    algorithm: "HS256",          
    subject: String(userId),     
    expiresIn: "7d",            
  });
}

//функция для верификации токена доступа и вмещает токен
export function verifyAccessToken(token: string): number {
  //проверяем токен с помощью ацесс секрета
  try {
    const payload = jwt.verify(token, accessSecret!, {
      algorithms: ["HS256"] 
    })
    //условие где говорим что если пейлоад строго равняется стринге или субьект не стринга
    if (typeof payload === "string" || typeof payload.sub !== "string" ) {
      throw new Error()
    }
    //субьект переделываем в число
    const userId = Number(payload.sub)
    //и проверяем что это число безопасное целое и типо больше нуля
    if (!Number.isSafeInteger(userId) || userId <= 0) {
      throw new Error()
    }
    //юзер айди возвращаем
    return userId
  }
  //если типо будет ошибка любая то кидаем эту ошибку
  catch {
    throw new Error("INVALID_ACCESS_TOKEN")
  }
}

//функция верификации рефреш токена
export function verifyRefreshToken(token: string): number {
  //проверяем токен с помощью рефреш секрета
  try {
    const payload = jwt.verify(token, refreshSecret!, {
      algorithms: ["HS256"] 
    })
    //условие где проверяем что пейлоад строго равняется стринге,
    //субьект строго не равняется стринге
    //и проверяет тип токена рефреш
    if (typeof payload === "string" || typeof payload.sub !== "string" || payload.type !== "refresh" ) {
      throw new Error()
    }
    //субьект переделываем в число
    const userId = Number(payload.sub)
    //проверяем что это число безопасное целое и типо больше нуля
    if (!Number.isSafeInteger(userId) || userId <= 0) {
      throw new Error()
    }
    return userId
  }
  //если типо будет ошибка любая то кидаем эту ошибку
  catch {
    throw new Error("INVALID_REFRESH_TOKEN")
  }
}