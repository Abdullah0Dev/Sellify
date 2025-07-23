"use client";
import { FileUpload } from "../../components/ui/file-upload";
import { usePreviewUpdater } from "../../context/UpdateContext";

export default function FileUploader() {
    const { setForm } = usePreviewUpdater()
    const handleFileUpload = (urls: string[]) => {
        setForm(prev => ({ ...prev, images: [...(prev.images || []), ...urls] }))
        console.log(urls);
    };
    return (
        <div className="w-full hide-scrollbar max-w-4xl max-h-[360px] overflow-clip overflow-y-scroll mx-auto min-h-40 border border-dashed bg-white dark:bg-black border-neutral-200 dark:border-neutral-800 rounded-lg">
            <FileUpload onChange={handleFileUpload} />
        </div>
    );
}
