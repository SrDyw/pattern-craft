# Singleton Pattern in React

The Singleton pattern restricts class instantiation to a single instance, useful for coordinating actions across systems.

## 🚫 React Pitfalls

### **Global State Issues**
- Difficult debugging and testing
- Unpredictable data flow
- Violates React's unidirectional data flow

### **Mutation Risks**
- Direct state mutations cause side effects
- Hard to track changes
- Conflicts with React's immutability principles

### **Design Problems**
- Creates monolithic architecture
- Hinders component reusability
- Hard to scale and maintain

## ✅ Better Alternatives in React

React provides a built-in alternative for managing global state called Context.

### **1. React Context API**
```tsx
export type User = {
    username: string;
    email: string;
}

export type UserContextType = [
    user: User,
    setUser: Dispatch<SetStateAction<User>>
]

const DEFAULT_USER: User = {
    username: "",
    email: ""
}

export const UserContext = createContext<UserContextType>([
    DEFAULT_USER,
    () => null
]);

// Provider for consuming the context in our application
export const UserContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState(DEFAULT_USER);

    return (
        <UserContext.Provider value={[user, setUser]}>
            {children}
        </UserContext.Provider>
    )
}
```

After creating our context and provider, we need to wrap our application where the context will be used:

```tsx
export default function Page() {
    return (
        <UserContextProvider>
            {/* ...rest of our app */}
        </UserContextProvider>
    )
}
```

Now we're ready to use our context:
```tsx
export default function Welcome() {
    const [user] = useContext(UserContext) as UserContextType;

    return (
        <>
            {user.username !== "" ? (
                <h2>Welcome from another component, <strong>{user.username}</strong></h2>
            ) : null}
        </>
    )
}
```

## 🎯 When to Use Singletons in React

**Safe uses:**
- Configuration objects
- Logging services
- External API clients
- Utility classes (stateless)

**Avoid for:**
- Component state
- UI state management
- Data that triggers re-renders

## ⚡ Key Takeaway
Use React's built-in patterns (Context, Hooks) instead of traditional Singletons for state management.