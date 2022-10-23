import { useDropzone } from "react-dropzone";

function Dropzone({ onDrop, accept, open }) {
    const { getRootProps, getInputProps, acceptedFiles  } = useDropzone({ accept, onDrop,});
    const files = acceptedFiles.map((file) => (
        <li key={file.path}>
          {file.path} 
        </li>
      ));
    return (
        <div className="dragAndDropCard">
            <div  {...getRootProps({ className: "dropzone" })}>
                <input className="input-zone" {...getInputProps()} />
                <div className="text-center">
                    <p className="dropzone-content">
                        Drag and drop some files here, or click to select files
                    </p>
                    <ul>{files}</ul>
                </div>
            </div>
        </div>

    );
}
export default Dropzone;