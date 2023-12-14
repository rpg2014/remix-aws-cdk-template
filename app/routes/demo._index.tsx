import { useEffect } from "react";
import { useTheme } from "~/hooks/useTheme";



const Index = () => {
    const {setTheme} = useTheme();
    return <p>On this page you can find links to several demos.</p>
}


export default Index;