import React from 'react';
import {FetchBaseQueryError} from "@reduxjs/toolkit/query";
import {SerializedError} from "@reduxjs/toolkit";

interface ErrorProps {
    error: FetchBaseQueryError | SerializedError | undefined;
    refetch?: () => void;
}

// Type guard functions
function isFetchBaseQueryError(error: any): error is FetchBaseQueryError {
    return error && 'status' in error;
}

function isSerializedError(error: any): error is SerializedError {
    return error && 'message' in error;
}

function hasDataProperty(error: any): error is { data: { message?: string; request?: string } } {
    return error && 'data' in error && typeof error.data === 'object';
}

const Error: React.FC<ErrorProps> = ({error}) => {
    let message = 'An unexpected error occurred.';
    let code = '';
    let request = '';

    if (error) {
        if (isFetchBaseQueryError(error)) {
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
                    // Use type guard for data property
                    if (hasDataProperty(error)) {
                        message = `Error: ${error.data.message || 'Unknown error'}`;
                        request = error.data.request || '';
                    } else {
                        message = `Error: Status ${error.status}`;
                    }
                    code = `Status Code: ${error.status}`;
            }
        } else if (isSerializedError(error)) {
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
            {request && <h2>{request}</h2>}
            <p><strong>{code}</strong></p>
            <p>{message}</p>
        </div>
    );
};

export default Error;