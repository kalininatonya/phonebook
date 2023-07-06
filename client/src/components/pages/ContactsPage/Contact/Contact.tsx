import React from 'react';
import {Link} from 'react-router-dom';
import {ContactProps} from '../models/contactProps';
import styles from './Contact.module.css';

export const Contact: React.FC<ContactProps> = ({contact, openModalDeletion}) => {
    const {
        id,
        description,
        telephone,
        name,
        surname
    } = contact;

    return (
        <div className={styles.contactContainer}>
            <span>{`${name} ${surname}`}</span>
            <span>
                <a href={`tel:${telephone}`}>{telephone}</a>
            </span>
            <span>{description}</span>
            <div className={styles.iconsContainer}>
                <Link to={`/contacts/edit/${id}`}>
                    <svg className={styles.iconEdit} width='100' stroke='black' strokeWidth='5' height='100'
                         viewBox='0 0 100 100' fill='none' xmlns='http://www.w3.org/2000/svg'>
                        <g clipPath='url(#clip0_8_17)'>
                            <line x1='70.4429' y1='17.7661' x2='15.4124' y2='73.7471'/>
                            <line x1='87.5582' y1='34.5908' x2='32.5277' y2='90.5717'/>
                            <line x1='69.6204' y1='35.7207' x2='13.3392' y2='92.9739'/>
                            <path d='M14.5844 92.2374L33.7476 89.847'/>
                            <path d='M14.0439 91.757L16.0982 72.5787'/>
                            <path d='M69.5238 15.1269L90.3606 35.3118'/>
                            <line x1='61.0325' y1='23.7729' x2='78.8608' y2='41.2986'/>
                        </g>
                        <defs>
                            <clipPath id='clip0_8_17'>
                                <rect width='100' height='100' fill='white'/>
                            </clipPath>
                        </defs>
                    </svg>
                </Link>
                <button
                    onClick={() => openModalDeletion(id)}
                    className={styles.iconDeleteWrapper}>
                    <svg className={styles.iconDelete} width='100' strokeWidth='5' height='100' stroke='black'
                         viewBox='0 0 100 100' fill='none' xmlns='http://www.w3.org/2000/svg'>
                        <path d='M22.5 27.5H77.5V92.5H22.5V27.5Z'/>
                        <rect x='17' y='20' width='66' height='8'/>
                        <path d='M35 13H65C66.6569 13 68 14.3431 68 16V20H32V16C32 14.3431 33.3431 13 35 13Z'/>
                        <line x1='34.5' y1='35' x2='34.5' y2='85'/>
                        <line x1='50.5' y1='35' x2='50.5' y2='85'/>
                        <line x1='66.5' y1='35' x2='66.5' y2='85'/>
                    </svg>
                </button>
            </div>
        </div>
    )
};