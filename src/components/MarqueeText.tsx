import * as React from "react";
import { Box, Typography } from "@mui/material";

interface Props {
    text: string;
    maxWidth: number;
    variant?: "body1" | "body2" | "subtitle1" | "subtitle2";
    speed?: number; // pixels per second
    pauseMs?: number; // pause at the ends
}

export const MarqueeText = ({
                                text,
                                maxWidth,
                                variant = "body1",
                                speed = 30,
                                pauseMs = 1000,
                            }: Props) => {
    const textRef = React.useRef<HTMLDivElement>(null);
    const [hovered, setHovered] = React.useState(false);
    const [scrolling, setScrolling] = React.useState<"forward" | "back" | null>(null);

    const startScroll = (dir: "forward" | "back", isCycle = false) => {
        if (!textRef.current) return;
        const distance = textRef.current.scrollWidth - maxWidth;
        if (distance <= 0) return;

        setScrolling(dir);

        const duration = (distance / speed) * 1000;

        setTimeout(() => {
            if (!hovered) {
                setScrolling(null);
                return;
            }

            if (!isCycle) {
                // reverse direction to complete the full cycle
                startScroll(dir === "forward" ? "back" : "forward", true);
            } else {
                // full cycle finished, stop and reset hover
                setScrolling(null);
                setHovered(false);
            }
        }, duration + pauseMs);
    };

    React.useEffect(() => {
        if (hovered && scrolling === null) {
            startScroll("forward");
        }
    }, [hovered]);

    const getTransform = () => {
        if (!textRef.current) return "translateX(0)";
        const distance = textRef.current.scrollWidth - maxWidth;
        if (distance <= 0) return "translateX(0)";

        if (scrolling === "forward") return `translateX(-${distance}px)`;
        if (scrolling === "back") return `translateX(0)`;
        return "translateX(0)";
    };

    const getTransition = () => {
        if (!textRef.current) return "none";
        const distance = textRef.current.scrollWidth - maxWidth;
        if (distance <= 0) return "none";

        if (scrolling === null) return "none";
        const duration = (distance / speed) * 1000;
        return `transform ${duration}ms linear`;
    };

    return (
        <Box
            sx={{ maxWidth, overflow: "hidden", position: "relative", cursor: "default" }}
            onMouseEnter={() => setHovered(true)}
            // we no longer reset hovered on leave, animation handles it
        >
            <Box
                ref={textRef}
                sx={{
                    display: "inline-block",
                    whiteSpace: "nowrap",
                    transform: getTransform(),
                    transition: getTransition(),
                }}
            >
                <Typography variant={variant}>{text}</Typography>
            </Box>
        </Box>
    );
};
