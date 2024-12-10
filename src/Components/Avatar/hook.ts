import {useState} from "react";
import {useSelector} from "react-redux";
import {userSelector} from "../../Services/store/slices/auth";
import {useSetAvatarMutation} from "../../Services/store/apiSlice.ts";

export const AvatarUploader = () => {
    const user = useSelector(userSelector);
    const [preview, setPreview] = useState<string | null>(user?.avatar || null); // Avatar preview
    const [file, setFile] = useState<File | null>(null); // Selected file
    const [setAvatar, {isLoading, error}] = useSetAvatarMutation();

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files?.[0];
        if (selectedFile) {
            setFile(selectedFile);
            setPreview(URL.createObjectURL(selectedFile)); // Generate preview URL
        }
    };

    const handleUpload = async () => {
        if (!file) return;
        try {
            const uid = user?.id;
            if (!uid) throw new Error("User ID is required to upload the avatar.");

            const formData = new FormData();
            formData.append("avatar", file);

            await setAvatar({id: uid, uid: file.name});
        } catch (err) {
            console.error("Failed to upload avatar:", err);
        }
    };

    return {preview, handleFileChange, handleUpload, isLoading, error};
};