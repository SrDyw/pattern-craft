import Form from "./Form";
import { UserContextProvider } from "./UsersContext";
import Welcome from "./Welcome";

export default function page() {
    return <UserContextProvider>
        <div className="w-screen h-screen flex flex-col justify-center items-center gap-4">
            <h1 className="font-black text-4xl">Singletton Example</h1>
            <Welcome/>
            <Form />
        </div>
    </UserContextProvider>
}