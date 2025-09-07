import React from "react";

type ProfileBackgroundProps = {
    color: string; // rgb, hex, etc.
    children: React.ReactNode;
};

const ProfileBackground = ({ color, children }: ProfileBackgroundProps) => {
    return (
        <div
            style={{
                borderRadius: "10px",
                background: `linear-gradient(180deg, ${color} 0%, #121212 100%, #292929 100%)`,
                color: "white"
            }}
        >
            {children}
        </div>
    );
};

export default ProfileBackground;
