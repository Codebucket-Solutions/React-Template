import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import classes from "./styles.module.scss";
import Pagination from "@mui/material/Pagination";
import Input from "../input";
import Button from "../button";


const Table = (props) => {
    const [allLabels, setAllLabels] = useState([]);
    const [sortSelected, setSortSelected] = useState("");
    const [pageNo, setPageNo] = useState(Number.parseInt(props.pageNumber || 1));
    const [colWidths, setColWidths] = useState([]);
    useEffect(() => {
        getColumn();
    }, [props.columns]);

    const getColumn = () => {
        if (props.columns && props.columns.length > 0) {

            let _allLabels = [];
            let _colWidths = [];
            props.columns.map((p) => {
                if (p.widthEnable) {
                    _colWidths.push(p.width);
                } else {
                    _colWidths.push("auto");
                }
                if (props.isChangeColumn) {

                    if (p.enable) _allLabels.push(p.field);

                } else {
                    _allLabels.push(p.field);
                }
            });
            setAllLabels(_allLabels);
            setColWidths(_colWidths);
        }
    };

    useEffect(() => {
        if (props.initialSort && !sortSelected) {
            setSortSelected(props.initialSort);
        }
    }, [props.initialSort]);

    const handleSelected = (event, value) => {


        if (props.fetchSelectedPage && typeof props.fetchSelectedPage === 'function') {
            props.fetchSelectedPage(value);
        }
    };

    // Filter

    const getCount = () => {
        if (props.countPages) {
            let a = Number.parseInt(props.totalSize) / props.countPages;

            if (Number.parseInt(props.totalSize) % props.countPages > 0) {
                a = a + 1;
            }
            return Number.parseInt(a);
        } else {
            let a = Number.parseInt(props.totalSize) / 10;
            if (Number.parseInt(props.totalSize) % 10 > 0) {
                a = a + 1;
            }

            return Number.parseInt(a);
        }
    };

    const onChangeCustomPage = () => {
        if (pageNo > 0 && pageNo <= getCount()) {
            props.onChangeCustomPage(pageNo);
        }
    };

    return (
        <div className={`${classes.table_wrapper} ${props.wrapperClassName || ''} ${props.spacing === false ? classes.no_gap : ''}`}>
            <table className={`${classes.table_container} ${props.className}`}>
                <thead>
                    <tr>
                        {props.columns.map((c) =>
                            !props.isChangeColumn || (props.isChangeColumn && c.enable) ? (
                                <th style={c.widthEnable ? { width: c.width } : {}} key={c.field}>
                                    <div
                                        className="custom-table-head"
                                        style={c.widthEnable ? { width: c.width } : {}}
                                    >
                                        {c.label}
                                    </div>
                                </th>
                            ) : null
                        )}
                    </tr>
                </thead>
                <tbody>
                    {props.rows &&
                        props.rows.length > 0 &&
                        props.rows.map((r, i) => (
                            <React.Fragment key={`row-fragment-${i}-${r.id || ''}`}>
                                {/* This is your data row */}
                                <tr key={`row-data-${i}-${r.id || ''}`}>
                                    {allLabels &&
                                        allLabels.length > 0 &&
                                        allLabels.map((a, idx) => (
                                            <td style={{ width: colWidths[idx] }} key={`${i}-${a}`}>{r[a]}</td>
                                        ))}
                                </tr>
                            </React.Fragment>
                        ))}
                </tbody>
            </table>
            {props.pagination ? (
                <div className={classes.table_pagination}>
                    {props.onChangeCustomPage && (
                        <div className={classes.pagination_input_group}>
                            <div>
                            <Input
                                type="number"
                                onChange={(e) => setPageNo(e.target.value)}
                                value={pageNo}
                            />
                            </div>
                            <div>
                            <Button
                                type="button"
                                variant="button_black"
                                button_text="Go"
                                onClick={onChangeCustomPage}
                            />
                            </div>
                        </div>
                    )}
                    <Pagination
                        variant="outlined"
                        shape="rounded"
                        count={props.maxPageCount || (props.totalSize ? getCount() : 0)}
                        showFirstButton
                        showLastButton
                        color="primary"
                        page={Number.parseInt(props.pageNumber)}
                        onChange={handleSelected}
                    />
                </div>
            ) : null}
        </div>
    );
};

Table.propTypes = {
    columns: PropTypes.arrayOf(
        PropTypes.shape({
            field: PropTypes.string.isRequired,
            label: PropTypes.string.isRequired,
            widthEnable: PropTypes.bool,
            width: PropTypes.string,
            enable: PropTypes.bool,
            sort: PropTypes.string
        })
    ).isRequired,
    rows: PropTypes.arrayOf(PropTypes.object).isRequired,
    pageNumber: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    totalSize: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    fetchSelectedPage: PropTypes.func,
    pagination: PropTypes.bool,
    className: PropTypes.string,
    wrapperClassName: PropTypes.string,
    isChangeColumn: PropTypes.bool,
    initialSort: PropTypes.string,
    countPages: PropTypes.number,
    onChangeCustomPage: PropTypes.func,
    spacing: PropTypes.bool,
    maxPageCount: PropTypes.number
};

Table.defaultProps = {
    pagination: false,
    className: "",
    isChangeColumn: false,
    initialSort: "",
    countPages: 10,
    totalSize: 0,
    pageNumber: 1,
    fetchSelectedPage: () => { },
    wrapperClassName: "",
    onChangeCustomPage: null,
    maxPageCount: null,
    spacing: true
};

export default Table;
