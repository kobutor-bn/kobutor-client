import { useState } from "react";
import { useSelector } from "react-redux";
import { userSelector } from "../../Services/store/slices/auth";
import { useSetAvatarMutation } from "../../Services/store/apiSlice";

export const AvatarUploader = () => {
    const user = useSelector(userSelector);
    const [preview, setPreview] = useState<string | null>(user?.avatar || null);
    const [file, setFile] = useState<File | null>(null);
    const [setAvatar, { isLoading, error }] = useSetAvatarMutation();

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files?.[0];
        if (selectedFile) {
            setFile(selectedFile);
            setPreview(URL.createObjectURL(selectedFile));
        }
    };

    // const handleUpload = async () => {
    //     if (!file) return;
    //
    //     try {
    //         const result = await setAvatar(file).unwrap();
    //         console.log("Avatar updated successfully!", result);
    //         setPreview(result.avatar);
    //     } catch (err) {
    //         console.error("Failed to upload avatar:", err);
    //     }
    // };

    const handleUpload = async () => {
        if (!file) return;

        try {
            const result = await setAvatar(file).unwrap();

            // Continue showing local preview until server returns final URL
            if (result?.avatar) {
                setPreview(result.avatar);
            }

        } catch (err) {
            console.error("Failed to upload avatar:", err);
        }
    };

    return { preview, handleFileChange, handleUpload, isLoading, error: error ? 'Upload failed' : null };
};