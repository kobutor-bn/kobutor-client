import React from 'react';
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { SerializedError } from "@reduxjs/toolkit";

interface ErrorProps {
    error: FetchBaseQueryError | SerializedError | undefined;
    refetch?: () => void;
}

const Error: React.FC<ErrorProps> = ({ error }) => {
    let message = 'An unexpected error occurred.';
    let code = '';
    let requestInfo = ''; // To store request details if available

    if (error) {
        if ('status' in error) {
            // Narrowing for FetchBaseQueryError
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
                    // Here, data is `unknown`. Perform a type assertion or check.
                    if (typeof error.data === 'object' && error.data !== null && 'message' in error.data) {
                        message = (error.data as { message: string }).message;
                    } else {
                        message = `Unexpected error response: ${JSON.stringify(error.data)}`;
                    }
                    code = `Status Code: ${error.status}`;
            }
            // Attempt to get request info from `data` if present
            if (typeof error.data === 'object' && error.data !== null && 'request' in error.data) {
                requestInfo = (error.data as { request: string }).request;
            }
        } else if ('message' in error) {
            // Narrowing for SerializedError
            message = error.message || message;
            code = error.code || 'UNKNOWN_ERROR';
        }
    }

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
            {requestInfo && <h2>{requestInfo}</h2>}
            <p><strong>{code}</strong></p>
            <p>{message}</p>
            {/* Uncomment the button if `refetch` is provided */}
            {/* {refetch && (
                <button onClick={refetch} style={{
                    marginTop: '1rem',
                    padding: '0.5rem 1rem',
                    border: 'none',
                    backgroundColor: '#d9534f',
                    color: 'white',
                    borderRadius: '4px',
                    cursor: 'pointer',
                }}>
                    Retry
                </button>
            )} */}
        </div>
    );
};

export default Error;