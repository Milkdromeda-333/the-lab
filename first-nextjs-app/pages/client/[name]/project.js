import { useRouter } from "next/router";

export default function Project() {
    const router = useRouter(),
        param = router.query;

    const goBackHome = () => {
        // programmatically navigate to a different route
        // router.push('/');
        router.replace('/'); // you cant go to the origional route back after this, it replaces the history of the route
        // router.push({
        //     pathname: "/client/[name]/project",
        //     query: { name: "Issa" }
        // }); pushing a dynamic route another way
    };
    return (

        <div>
            <h1>Project page {param.name}</h1>
            <button onClick={goBackHome}>Home</button>
        </div>
    );
}