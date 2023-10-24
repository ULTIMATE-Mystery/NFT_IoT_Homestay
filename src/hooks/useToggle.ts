import { useCallback, useState } from 'react';

const useToggle = (initialValue = false) => {
    const [value, setValue] = useState(initialValue);
    const toggle = useCallback(
        (newValue?: boolean) =>
            setValue(currentValue =>
                typeof newValue === 'boolean' ? newValue : !currentValue
            ),
        []
    );
    return [value, toggle] as const;
};

export default useToggle;
