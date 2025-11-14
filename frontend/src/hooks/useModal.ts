import { useState } from "react";

export const useModal = () => {
    const [open, setOpen] = useState(false);

    const toggleOpen = () => {
        setOpen((prev) => !prev);
    }

    return { open, setOpen, toggleOpen }
}