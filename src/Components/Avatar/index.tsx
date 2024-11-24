import {useRef} from "react";
import {AvatarUploader} from "./hook.ts";

const Avatar = () => {
    const {preview, handleFileChange, handleUpload, isLoading, error} = AvatarUploader();
    const fileInputRef = useRef<HTMLInputElement | null>(null); // Reference for the file input

    const handleChooseFileClick = () => {
        fileInputRef.current?.click(); // Trigger the file input
    };

    return (
        <div className="flex flex-col items-center">
            {/* Avatar Preview */}
            <div className="relative w-24 h-24 rounded-full border shadow-md">
                {preview ? (
                    <img
                        src={preview}
                        alt="Avatar Preview"
                        className="w-full h-full rounded-full object-cover"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                        No Avatar
                    </div>
                )}
            </div>

            {/* Upload Input */}
            <input
                type="file"
                accept="image/jpeg, image/jpg, image/png"
                ref={fileInputRef} // Attach the ref to the input
                onChange={handleFileChange}
                className="hidden"
            />
            <button
                className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                onClick={handleChooseFileClick} // Trigger input click
                disabled={isLoading}
            >
                Choose File
            </button>

            {/* Upload Button */}
            {preview && (
                <button
                    onClick={handleUpload}
                    className={`mt-4 px-4 py-2 rounded text-white ${
                        isLoading ? "bg-gray-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"
                    }`}
                    disabled={isLoading}
                >
                    {isLoading ? "Uploading..." : "Upload Avatar"}
                </button>
            )}

            {/* Error Display */}
            {error && (
                <p className="text-red-600 text-sm mt-2">
                    Failed to upload avatar. Please try again.
                </p>
            )}
        </div>
    );
};

export default Avatar;