"use client"

import {usePreloader} from "../../../hooks/usePreloader";
import Preloader from "../../ui/preloader/preloader";

const WrapperPreloader = () => {
    const {isLoading} = usePreloader();

    if (!isLoading) return null;

    return (
        <Preloader isPopUp={true}/>
    )

}

export default WrapperPreloader;