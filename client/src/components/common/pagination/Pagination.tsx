import * as React from 'react';
import cn from 'classnames';
import {PaginationProps} from './models/paginationProps';
import styles from './Pagination.module.css';

export const Pagination: React.FC<PaginationProps> = ({changeCurrentPage, page, pages}) => {
    return (
        <div className={styles.pagesContainer}>
            {
                pages.map((p) => {
                        return (
                            <span
                                key={p}
                                className={cn({[styles.selectedPage]: p === page}, {[styles.page]: p !== page})}
                                onClick={() => changeCurrentPage(p)}>
                                {p}
                            </span>
                        )
                    }
                )}
        </div>
    )
};
