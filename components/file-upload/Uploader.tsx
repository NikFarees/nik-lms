"use client";

import { useCallback, useState } from 'react';
import { FileRejection, useDropzone } from 'react-dropzone';
import { Card, CardContent } from '../ui/card';
import { cn } from '@/lib/utils';
import { RenderEmptyState, RenderErrorState } from './RenderState';
import { toast } from 'sonner';
import { v4 as uuidv4 } from 'uuid';

interface UploaderState {
    id: string | null;
    file: File | null;
    uploading: boolean;
    progress: number;
    key?: string;
    isDeleting: boolean;
    error: boolean;
    objectURL?: string;
    fileType: "image" | "video";
}

export function Uploader() {

    const [fileState, setFileState] = useState<UploaderState>({
        id: null,
        file: null,
        uploading: false,
        progress: 0,
        isDeleting: false,
        error: false,
        fileType: "image"
    });

    async function uploadFile(file: File) {
        setFileState((prev) => ({
            ...prev,
            uploading: true,
            progress: 0,
        }));

        try {

            //1. Get presigned url 
            const presignedResponse = await fetch("/api/s3/upload", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    fileName: file.name,
                    contentType: file.type,
                    size: file.size,
                    isImage: true,
                }),
            });

            if (!presignedResponse.ok) {
                toast.error("Failed to get presigned URL");
                setFileState((prev) => ({
                    ...prev,
                    uploading: false,
                    progress: 0,
                    error: true,
                }));

                return;
            }

            const { presignedUrl, key } = await presignedResponse.json();

        } catch {

        }
    }

    const onDrop = useCallback((acceptedFiles: File[]) => {
        if (acceptedFiles.length > 0) {
            const file = acceptedFiles[0]

            setFileState({
                id: uuidv4(),
                file: file,
                uploading: true,
                progress: 0,
                isDeleting: false,
                error: false,
                objectURL: URL.createObjectURL(file),
                fileType: "image",
            })

        }
    }, [])

    function rejectedFiles(fileRejection: FileRejection[]) {
        if (fileRejection.length) {
            const tooManyFiles = fileRejection.find((rejection) => rejection.errors[0].code === 'too-many-files')
            const fileSizeToBig = fileRejection.find((rejection) => rejection.errors[0].code === 'file-too-large')

            if (fileSizeToBig) {
                toast.error("File size is too large. Maximum allowed size is 5MB.");
            }

            if (tooManyFiles) {
                toast.error("Too many files selected. Please select only one file.");
            }
        }
    }

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: { "image/*": [] },
        maxFiles: 1,
        multiple: false,
        maxSize: 5 * 1024 * 1024, // 5 MB
        onDropRejected: rejectedFiles,
    });

    return (
        <Card
            {...getRootProps()}
            className={cn(
                "relative border-2 border-dashed transition-colors duration-200 ease-in-out w-full h-64",
                isDragActive
                    ? "border-primary bg-primary/10 border-solid"
                    : "border-border hover:border-primary"
            )}
        >
            <CardContent className="flex items-center justify-center h-full">
                <input {...getInputProps()} />
                {
                    <RenderEmptyState isDragActive={isDragActive} />
                }
            </CardContent>
        </Card>
    )
}
