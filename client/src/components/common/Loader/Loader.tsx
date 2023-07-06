import * as React from 'react';
import {sizes} from '../../../constants';
import loader from '../../../icons/loader.gif';
import {LoaderProps} from './models/loaderProps';
import styles from './Loader.module.css';

export const Loader: React.FC<LoaderProps> = ({isLoading, overlay, size, children}) => {
    let width;
    switch (size) {
        case sizes.small :
            width = '100px';
            break;
        case sizes.large :
            width = '300px';
            break;
        default:
            width = '200px';
            break;
    }

    return (
        <div className={styles.container}>
            {isLoading && overlay ? <div className={styles.loaderOverlay}/> : null}
            {
                isLoading ?
                    <div className={styles.loaderContainer}>
                        <img src={loader} alt='loader' style={{width}}/>
                    </div>
                    : null
            }
            {children}
        </div>
    )
};
