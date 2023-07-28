import { useRouter } from "next/router";

export default function Slug() {
    const param = useRouter().query;
    console.log(JSON.stringify(param));

    return <h1>SLUGG</h1>;
}