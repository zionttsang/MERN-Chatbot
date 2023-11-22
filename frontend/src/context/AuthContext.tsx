import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import { loginUser, signupUser } from "../helper/api-connector";

type User = {
    name: string;
    email: string;
};
type UserAuth = {
    isLoggedIn: boolean;
    user: User | null;
    login: (email: string, password: string) => Promise<void>;
    signup: (name: string, email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
};
const AuthContext = createContext<UserAuth | null>(null);
/**
 * 在JavaScript中，当我们使用 TypeScript（一个JavaScript的静态类型检查扩展）时，会看到这种尖括号`< >`出现在代码中。具体到你这行代码：

```javascript
const AuthContext = createContext<UserAuth | null>(null);
```

剖析一下：

- `UserAuth` 是一个预定义的类型，它可能是一个接口或其他类型别名。
- `null` 这个类型就是 JavaScript 的 `null` 类型。
- `<UserAuth | null>` 这就是 TypeScript 的联合类型（Union Types），表示 AuthContext 的值可以是 `UserAuth` 类型或者 `null`。

`createContext` 是 React 的一个API，用于创建一个新的 Context 对象。`<UserAuth | null>` 是该函数的一个泛型参数，这里表示传给这个 context 的 value 应当是`UserAuth 类型`或者`null`，在这个例子中，我们一开始把`null`传给这个 context。

于是，`const AuthContext = createContext<UserAuth | null>(null);` 表示创建的 AuthContext 的 value 值可以是 `UserAuth` 类型的对象，也可以是 `null`。  
 */


export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        // fetch if the user's cookies are valid then skip login
        async function checkStatus() {
            // const data = await checkAuthStatus();
            // if (data) {
            //     setUser({ email: data.email, name: data.name });
            //     setIsLoggedIn(true);
            // }
        }
        checkStatus();
    }, []);
    const login = async (email: string, password: string) => {
        const data = await loginUser(email, password);
        if (data) {
            setUser({ email: data.email, name: data.name });
            setIsLoggedIn(true);
        }
    };
    const signup = async (name: string, email: string, password: string) => {
        const data = await signupUser(name, email, password);
        if (data) {
            setUser({ email: data.email, name: data.name });
            setIsLoggedIn(true);
        }
    };
    const logout = async () => {
        //   await logoutUser();
        //   setIsLoggedIn(false);
        //   setUser(null);
        //   window.location.reload();
    };

    const value = {
        user,
        isLoggedIn,
        login,
        logout,
        signup,
    };
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);