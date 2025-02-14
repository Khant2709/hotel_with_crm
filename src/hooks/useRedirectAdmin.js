'use client';

import {useEffect} from 'react';
import {useRouter} from 'next/navigation';
import {usePreloaderAdmin} from './usePreloaderAdmin';
import {checkToken} from '../services/authService';

export const useRedirectAdmin = () => {
    const router = useRouter();
    const {setToggleStatePreloader} = usePreloaderAdmin();

    useEffect(() => {
        const handleTokenCheck = async () => {
            await checkToken(router);
            setToggleStatePreloader(false);
        };

        handleTokenCheck();
    }, [router, setToggleStatePreloader]);
};
