import logoUrl from "../assets/logo.png";

type Props = {
  className?: string;
  title?: string;
};

export default function Logo({
  className = "",
  title = "ตราสัญลักษณ์ สมาคมเซอร์เวย์ประเทศไทย",
}: Props) {
  return (
    <img
      src={logoUrl.src}
      width={logoUrl.width}
      height={logoUrl.height}
      alt={title}
      className={className}
      draggable={false}
      decoding="async"
    />
  );
}
