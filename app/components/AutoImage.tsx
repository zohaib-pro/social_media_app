import Image from "next/image";

interface AutoImageProps {
  src: string;
  alt: string;
  className?: string;
}

const AutoImage: React.FC<AutoImageProps> = ({
  src,
  alt = "Image",
  className = "",
}) => (
  <div
    className={`relative w-full mb-4 rounded-xl overflow-hidden ${className}`}
  >
    <Image
      src={src}
      alt={alt}
      layout="fill"
      objectFit="cover"
      className="rounded-xl"
    />
  </div>
);

export default AutoImage;
