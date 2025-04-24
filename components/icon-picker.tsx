"use client";

import EmojiPicker, { Theme } from "emoji-picker-react";
import { useTheme } from "next-themes";
import { PopoverTrigger, Popover, PopoverContent } from "./ui/popover";


interface EmojiPickerProps {
    onChange: (icon: string) => void;
    children: React.ReactNode;
    asChild: boolean;
}

const IconPicker = ({ onChange, children, asChild }: EmojiPickerProps) => {
    const { resolvedTheme } = useTheme();
    const currentTheme = (resolvedTheme || 'light') as keyof typeof themeMap;

    const themeMap = {
        "dark": Theme.DARK,
        "light": Theme.LIGHT,
    }

    const theme = themeMap[currentTheme];

    return (
        <Popover>
            <PopoverTrigger asChild={asChild}>
                {children}
            </PopoverTrigger>
            <PopoverContent className="p-0 w-full border-none">
                <EmojiPicker theme={theme} height={350} onEmojiClick={(emoji) => onChange(emoji.emoji)} />
            </PopoverContent>
        </Popover>
    );
}

export default IconPicker;