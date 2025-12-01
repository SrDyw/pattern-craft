# Debounce

A strategy to discard operations that occur too close together, which can affect app performance.

## When to Use Debounce?
A common use case is for search inputs that trigger API calls.

```tsx
const onChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const text = event.currentTarget.value;
    const request = await fetch(`/api/products?name=${text}`);
    const data = await request.json() as ApiResponse<Product[]>;
    
    setProducts(data.data ?? []);
}

return <input
    type="text"
    placeholder="Search product by name..."
    onChange={onChange}
/>
```

Consider this: is it really necessary to trigger the fetch method for EVERY keystroke? If a user types "laptop", the app would fetch products for: 'l', 'la', 'lap', 'lapt', 'lapto', 'laptop'.

![Network usage without debounce](/public/debounce/network.png)

Debounce aims to avoid this by only sending the request when the user finishes typing.

## Creating a Custom Hook
```tsx
export const useDebounce = (delay: number): [string, Dispatch<SetStateAction<string>>] => {
    const [text, setText] = useState("");
    const [debouncedText, setDebouncedText] = useState("");
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        timeoutRef.current = setTimeout(() => {
            setDebouncedText(text);
        }, delay);

        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, [text, delay]);

    return [debouncedText, setText];
};
```

This custom hook accepts a `delay` parameter (in milliseconds) that determines how long to wait before updating the debounced value.

## Using the Debounced Value
```tsx
const [debouncedSearch, setSearch] = useDebounce(500); // 500ms delay
const [products, setProducts] = useState<Product[]>([]);

useEffect(() => {
    const fetchProducts = async () => {
        if (!debouncedSearch) return;
        
        const request = await fetch(`/api/products?name=${debouncedSearch}`);
        const data = await request.json() as ApiResponse<Product[]>;
        setProducts(data.data ?? []);
    };
    
    fetchProducts();
}, [debouncedSearch]);

const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.currentTarget.value);
}
```

## Key Benefits
- ✅ Reduces API calls significantly
- ✅ Improves app performance
- ✅ Better user experience
- ✅ Less network traffic


