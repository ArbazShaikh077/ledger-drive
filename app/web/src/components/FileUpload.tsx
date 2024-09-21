import { FileUpload } from "@/components/ui/file-upload";
import { useSetRecoilState } from "recoil";
import { filesState } from "@/store/file_explorer";

export function FileUploader() {
  const setFiles = useSetRecoilState(filesState);

  const handleFileUpload = (newFiles: File[]) => {
    setFiles((prevFiles) => [...prevFiles, ...newFiles]);
    console.log(newFiles);
  };

  return (
    <div className="w-full max-h-[600px] max-w-4xl mx-auto min-h-96 border border-dashed bg-white dark:bg-black border-neutral-200 dark:border-neutral-800 rounded-lg">
      <FileUpload onChange={handleFileUpload} />
    </div>
  );
}
