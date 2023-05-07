import { FC, useEffect, useRef, useState } from "react";

interface PropsType {
  header: string;
  setImage: (file: File) => void;
  imgSrc: string;
  isOn?: boolean;
  isVideo?: boolean;
}

const UploadImage: FC<PropsType> = ({
  setImage,
  header,
  isOn,
  imgSrc,
  isVideo,
}) => {
  const buttonRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (buttonRef.current) {
      console.log("RENDER");
      buttonRef.current.value = "";
      setFilename("");
      setImage(null);
    }
  }, [isVideo]);
  console.log(isVideo);

  const [filename, setFilename] = useState<string>("Choose file");
  return (
    <div className="my-2">
      <h5 className="mb-3">{header}</h5>
      <div className="d-flex gap-4">
        <div className="flex-grow-1">
          <label className="w-100">
            <input
              ref={buttonRef}
              disabled={typeof isOn === "boolean" && !isOn}
              onChange={(e) => {
                setFilename(e.currentTarget?.files[0]?.name);
                setImage(e.currentTarget.files[0]);
              }}
              accept={isVideo ? "video/mp4,video/x-m4v,video/*" : "image/*"}
              className="d-none"
              type="file"
            />
            <div className="d-flex align-items-stretch bg-border-color">
              <div
                className="input flex-grow-1"
                style={{
                  backgroundColor: !(typeof isOn === "boolean" && !isOn)
                    ? "white"
                    : "#fafafa",
                }}>
                {filename}
              </div>
              <h6 className="p-3 pb-2">Browse</h6>
            </div>
          </label>
        </div>
        {imgSrc && (
          <div>
            {isVideo ? (
              <div
                className="d-flex justify-content-center align-items-center p-2"
                style={{ width: 50, background: "#eee", height: "100%" }}>
                Video
              </div>
            ) : (
              <img src={imgSrc} width={50} alt="" />
            )}
          </div>
        )}
      </div>
    </div>
  );
};
export default UploadImage;
