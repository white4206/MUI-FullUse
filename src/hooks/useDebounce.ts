import { useCallback } from 'react';
import { debounce } from 'lodash';

const useDebounce = <T extends (...args: any[]) => any>(callback: T, delay: number) => {
    const debouncedCallback = useCallback(debounce(callback, delay), [callback, delay]);

    return debouncedCallback;
};

export default useDebounce;
