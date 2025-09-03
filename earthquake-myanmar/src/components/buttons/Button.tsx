"use client";

import React from "react";

type CustomButtonProps = {
    className?: string;
    buttonName: string;
    onClick?: () => void;
};

const CustomButton = ({ className = "", buttonName, onClick }: CustomButtonProps) => {
    return (
        <button
            onClick={onClick}
            className={className}
        >
            {buttonName}
        </button>
    );
};

export default CustomButton;
