interface UploadResponse {
    id: string;
    path: string;
    url: string;
    name: string;
    size: number;
    extension: string;
}

export class FileService {
    static async uploadAvatar(file: File): Promise<UploadResponse[]> {
        const formData = new FormData();
        formData.append('file', file);

        const response = await fetch('/api/v1/user/avatar', {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
            },
            body: formData,
        });

        if (!response.ok) {
            throw new Error('Failed to upload avatar');
        }

        return response.json();
    }
}