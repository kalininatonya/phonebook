import React from 'react';

export interface LoaderProps {
    isLoading: boolean,
    overlay: boolean,
    size: string,
    children: React.ReactNode;
}