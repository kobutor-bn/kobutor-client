import React from 'react';
import {FetchBaseQueryError} from "@reduxjs/toolkit/query";
import {SerializedError} from "@reduxjs/toolkit";

interface ErrorProps {
    error: FetchBaseQueryError | SerializedError | undefined;
    refetch?: () => void;
}

const Error: React.FC<ErrorProps> = ({error}) => {
    let message = 'An unexpected error occurred.';
    let code = '';

    if (error) {
        if ('status' in error) {
            switch (error.status) {
                case "FETCH_ERROR":
                case "TIMEOUT_ERROR":
                case "CUSTOM_ERROR":
                    message = error.error;
                    code = error.status;
                    break;
                case "PARSING_ERROR":
                    message = error.error;
                    code = `PARSING_ERROR (${error.originalStatus})`;
                    break;
                default:
                    message = `Error: ${error?.data?.message}`;
                    code = `Status Code: ${error.status}`;
            }
        } else if ('message' in error) {
            // Handle SerializedError types
            message = error.message || message;
            code = error.code || 'UNKNOWN_ERROR';
        }
    }

    console.log(error)

    return (
        <div style={{
            border: '1px solid #f5c2c7',
            backgroundColor: '#f8d7da',
            color: '#842029',
            padding: '1rem',
            borderRadius: '5px',
            maxWidth: '400px',
            margin: '1rem auto',
            textAlign: 'center'
        }}>
            <h2>{error?.data?.request}</h2>
            <p><strong>{code}</strong></p>
            <p>{message}</p>
            {/*<button onClick={refetch} style={{*/}
            {/*    marginTop: '1rem',*/}
            {/*    padding: '0.5rem 1rem',*/}
            {/*    border: 'none',*/}
            {/*    backgroundColor: '#d9534f',*/}
            {/*    color: 'white',*/}
            {/*    borderRadius: '4px',*/}
            {/*    cursor: 'pointer',*/}
            {/*}}>*/}
            {/*    Retry*/}
            {/*</button>*/}
        </div>
    );
};

export default Error;