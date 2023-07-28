import { useParams } from "react-router-dom";
function Test() {
    const params = useParams();
    console.log(params)
    // const ctg = params.category;
    return ( <>
    <h1>id:{params.id}</h1>
    </> );
}

export default Test;