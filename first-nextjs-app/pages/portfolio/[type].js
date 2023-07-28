import { useRouter } from "next/router";

export default function Type() {
    const param = useRouter().query.type;

    return <h1>Type page: {param}</h1>;
}